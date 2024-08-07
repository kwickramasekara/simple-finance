"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ID } from "node-appwrite";
import { createAdminClient } from "@/lib/server/appwrite";

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
  } catch (error) {
    return {
      error: JSON.stringify((error as any)?.response?.message),
    };
  }

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

  redirect("/dashboard");
}
