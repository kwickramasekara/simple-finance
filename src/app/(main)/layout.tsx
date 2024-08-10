import { getSignedInUser } from "@/lib/appwrite";
import { redirect } from "next/navigation";
import Nav from "@/components/main/nav";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getSignedInUser();

  if (!user) redirect("/sign-in");

  return (
    <div className="w-full h-screen flex flex-col lg:flex-row">
      <Nav user={user} />
      <div className="w-full h-full main-bg">
        <div className="p-12 bg-black/80 w-full h-full">{children}</div>
      </div>
    </div>
  );
}
