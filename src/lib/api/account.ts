"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
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
  } catch (error) {
    return handleError(error);
  }

  redirect("/dashboard");
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
  } catch (error) {
    return handleError(error);
  }

  redirect("/dashboard");
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

export async function getAccount(): Promise<APIResponse> {
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
