import { getSignedInUser } from "@/lib/appwrite";
import { redirect } from "next/navigation";
import Hero from "@/components/auth/hero";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getSignedInUser();

  if (user) redirect("/dashboard");

  return (
    <div className="w-full grid lg:grid-cols-2 h-screen">
      <Hero />
      <div className="flex items-center justify-center py-12">{children}</div>
    </div>
  );
}
