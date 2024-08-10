"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "@/lib/appwrite";

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
    return {
      error: JSON.stringify((error as any)?.response?.message),
    };
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
  } catch (error) {
    return {
      error: JSON.stringify((error as any)?.response?.message),
    };
  }

  redirect("/dashboard");
}

export async function signOutAction() {
  try {
    const { account } = await createSessionClient();

    cookies().delete("sf-user-session");

    const response = await account.deleteSession("current");

    return response;
  } catch (error) {
    return null;
  }
}
