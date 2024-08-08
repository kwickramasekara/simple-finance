import { getLoggedInUser } from "@/lib/appwrite";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getLoggedInUser();

  if (!user) redirect("/sign-in");

  return <>{children}</>;
}
