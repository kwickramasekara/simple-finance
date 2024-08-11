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
    <div className="w-full h-full min-h-screen flex flex-col lg:flex-row">
      <Nav user={user} />

      <div className="w-full h-full min-h-screen main-bg">
        <div className="p-6 md:p-12 bg-black/85 w-full h-full min-h-screen">
          <div className="max-w-screen-lg mx-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
