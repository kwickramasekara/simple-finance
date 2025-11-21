"use server";

import { cookies } from "next/headers";
import { ID, AuthenticatorType, AuthenticationFactor } from "node-appwrite";
import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { handleError } from "@/lib/utils";

export async function signUpAction(prevState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const name = formData.get("name");

  const { account } = await createAdminClient();

  try {
    await account.create(
      ID.unique(),
      email as string,
      password as string,
      name as string
    );

    const session = await account.createEmailPasswordSession(
      email as string,
      password as string
    );

    cookies().set("sf-user-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return {
      success: true,
    };
  } catch (error) {
    return handleError(error);
  }
}

export async function signInAction(prevState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(
      email as string,
      password as string
    );

    cookies().set("sf-user-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    // MFA
    const { account: clientAccount } = await createSessionClient();
    await clientAccount.get(); // will throw error if MFA is required

    return {
      success: true,
    };
  } catch (error) {
    return handleError(error);
  }
}

export async function signOut() {
  try {
    const { account } = await createSessionClient();

    cookies().delete("sf-user-session");

    const response = await account.deleteSession("current");

    return response;
  } catch (error) {
    return handleError(error);
  }
}

export async function createMFA(): Promise<APIResponse> {
  try {
    const { account, avatar } = await createSessionClient();

    const { secret, uri } = await account.createMfaAuthenticator(
      AuthenticatorType.Totp
    );

    const qrResult = await avatar.getQR(uri);
    const qr = Buffer.from(qrResult).toString("base64");

    return {
      success: JSON.stringify({
        secret,
        qr,
      }),
    };
  } catch (error) {
    return handleError(error);
  }
}

export async function verifyMFAAction(
  prevState: any,
  formData: FormData
): Promise<APIResponse> {
  try {
    const otp = formData.get("otp");
    const { account } = await createSessionClient();

    if (!otp) throw new Error("OTP is required");

    await account.updateMfaAuthenticator(AuthenticatorType.Totp, otp as string);

    return {
      success: true,
    };
  } catch (error) {
    return handleError(error);
  }
}

export async function createMFARecoveryCodes(): Promise<APIResponse> {
  try {
    const { account } = await createSessionClient();

    const { recoveryCodes } = await account.createMfaRecoveryCodes();

    return {
      success: JSON.stringify(recoveryCodes),
    };
  } catch (error) {
    return handleError(error);
  }
}

export async function enableMFA(): Promise<APIResponse> {
  try {
    const { account } = await createSessionClient();

    await account.updateMFA(true);

    return {
      success: true,
    };
  } catch (error) {
    return handleError(error);
  }
}

export async function disableMFAAction(
  prevState: any,
  formData: FormData
): Promise<APIResponse> {
  try {
    const otp = formData.get("otp");
    const challengeId = formData.get("challengeId");

    const { account } = await createSessionClient();

    if (!otp || !challengeId)
      throw new Error("Challenge ID and OTP are required");

    await account.updateMfaChallenge(challengeId as string, otp as string);
    await account.deleteMfaAuthenticator(AuthenticatorType.Totp, otp as string);
    await account.updateMFA(false);
    // revalidatePath("/account");

    return {
      success: true,
    };
  } catch (error) {
    return handleError(error);
  }
}

export async function createMFAChallenge(
  recovery: boolean = false
): Promise<APIResponse> {
  try {
    const { account } = await createSessionClient();

    const challenge = await account.createMfaChallenge(
      recovery ? AuthenticationFactor.Recoverycode : AuthenticationFactor.Totp
    );

    return {
      success: challenge.$id,
    };
  } catch (error) {
    return handleError(error);
  }
}

export async function verifyMFAChallengeAction(
  prevState: any,
  formData: FormData
): Promise<APIResponse> {
  try {
    const challengeId = formData.get("challengeId");
    const otp = formData.get("otp");

    if (!challengeId || !otp)
      throw new Error("Challenge ID and OTP are required");

    const { account } = await createSessionClient();

    await account.updateMfaChallenge(challengeId as string, otp as string);

    return {
      success: true,
    };
  } catch (error) {
    return handleError(error);
  }
}

export async function regenerateRecoveryCodes() {
  try {
    const { account } = await createSessionClient();

    const { recoveryCodes } = await account.updateMfaRecoveryCodes();

    return {
      success: JSON.stringify(recoveryCodes),
    };
  } catch (error) {
    return handleError(error);
  }
}

export async function getAccountAction(): Promise<APIResponse> {
  try {
    const { account } = await createSessionClient();

    const res = await account.get();

    return {
      success: JSON.stringify(res),
    };
  } catch (error) {
    return handleError(error);
  }
}

export async function uploadAvatarAction(
  prevState: any,
  formData: FormData
): Promise<APIResponse> {
  try {
    const { account, storage } = await createSessionClient();
    const file = formData.get("file") as File;

    if (!file) throw new Error("No file provided");

    // Validate file size (1MB = 1048576 bytes)
    if (file.size > 1048576) {
      throw new Error("File size must be less than 1MB");
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      throw new Error("Only JPG, PNG, and WebP images are allowed");
    }

    const user = await account.get();
    const oldAvatarId = user.prefs?.avatarId;

    // Delete old avatar if exists
    if (oldAvatarId) {
      try {
        await storage.deleteFile(
          process.env.APPWRITE_AVATAR_BUCKET_ID!,
          oldAvatarId
        );
      } catch (error) {
        console.error("Failed to delete old avatar:", error);
      }
    }

    // Upload new avatar
    const newFileId = ID.unique();
    const uploadedFile = await storage.createFile(
      process.env.APPWRITE_AVATAR_BUCKET_ID!,
      newFileId,
      file
    );

    // Store the base view URL (will be optimized client-side)
    const avatarUrl = `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.APPWRITE_AVATAR_BUCKET_ID}/files/${uploadedFile.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;

    // Update user preferences with new avatar info
    await account.updatePrefs({
      ...user.prefs,
      avatarId: uploadedFile.$id,
      avatarUrl: avatarUrl,
    });

    return {
      success: JSON.stringify({
        avatarId: uploadedFile.$id,
        avatarUrl: avatarUrl,
      }),
    };
  } catch (error) {
    return handleError(error);
  }
}

export async function deleteAvatarAction(): Promise<APIResponse> {
  try {
    const { account, storage } = await createSessionClient();

    const user = await account.get();
    const avatarId = user.prefs?.avatarId;

    if (!avatarId) {
      throw new Error("No avatar to delete");
    }

    // Delete avatar file
    await storage.deleteFile(process.env.APPWRITE_AVATAR_BUCKET_ID!, avatarId);

    // Update user preferences to remove avatar info
    const { avatarId: _, avatarUrl: __, ...restPrefs } = user.prefs;
    await account.updatePrefs(restPrefs);

    return {
      success: true,
    };
  } catch (error) {
    return handleError(error);
  }
}
