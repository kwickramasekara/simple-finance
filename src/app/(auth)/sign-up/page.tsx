import { SignUpForm } from "@/components/auth-forms";
import { getLoggedInUser } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";

export default async function SignUp() {
  const user = await getLoggedInUser();

  if (user) redirect("/dashboard");

  return <SignUpForm></SignUpForm>;
}
