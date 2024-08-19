"use client";

import { Models } from "node-appwrite";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Logo from "@/components/common/logo";
import {
  LogOut,
  SquareUserRound,
  Menu,
  LayoutDashboard,
  Scale,
  LineChart,
  Hourglass,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { signOutAction } from "@/lib/actions/auth";

async function handleSignOut() {
  await signOutAction();
}

function NavLinks() {
  const path = usePathname();

  return (
    <nav className="w-full p-12 flex flex-col gap-6">
      <Link
        href="/dashboard"
        className={cn(
          "flex gap-2 text-muted-foreground font-semibold hover:text-foreground",
          path === "/dashboard" && "text-foreground"
        )}
      >
        <LayoutDashboard />
        Dashboard
      </Link>
      <Link
        href="/budget"
        className={cn(
          "flex gap-2 text-muted-foreground font-semibold hover:text-foreground",
          path === "/budget" && "text-foreground"
        )}
      >
        <Scale />
        Budget
      </Link>
      <Link
        href="/net-worth"
        className={cn(
          "flex gap-2 text-muted-foreground font-semibold hover:text-foreground",
          path === "/net-worth" && "text-foreground"
        )}
      >
        <LineChart />
        Net Worth
      </Link>
      <Link
        href="/retirement"
        className={cn(
          "flex gap-2 text-muted-foreground font-semibold hover:text-foreground",
          path === "/retirement" && "text-foreground"
        )}
      >
        <Hourglass />
        Retirement
      </Link>
    </nav>
  );
}

function UserNav({ user }: { user: Models.User<Models.Preferences> | null }) {
  return (
    <div className="w-full p-12 user-nav">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-foreground">
            <Avatar>
              <AvatarFallback>{user?.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="max-w-36 truncate font-semibold text-inherit">
                {user?.name}
              </p>
              <p className="text-sm max-w-36 truncate text-inherit">
                {user?.email}
              </p>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="min-w-48">
          <DropdownMenuItem className="cursor-pointer text-base">
            <Link href="/account" className="flex items-center">
              <SquareUserRound size={16} className="mr-2" />
              Account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer text-base"
            onClick={handleSignOut}
          >
            <LogOut size={16} className="mr-2" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
function DrawerNav({ user }: { user: Models.User<Models.Preferences> | null }) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <NavLinks />
        <UserNav user={user} />
      </DrawerContent>
    </Drawer>
  );
}

export default function Nav({
  user,
}: {
  user: Models.User<Models.Preferences> | null;
}) {
  return (
    <>
      {/* Mobile nav  */}
      <div className="w-screen lg:hidden bg-neutral-950">
        <div className="flex justify-between py-6 px-6 md:px-12">
          <div className="w-full inline-flex gap-2 items-center">
            <Logo size="sm" />
            <h1 className="text-xl font-semibold">Simple Finance</h1>
          </div>
          <DrawerNav user={user} />
        </div>
      </div>

      {/* Desktop nav  */}
      <div className="hidden lg:flex flex-col min-w-72 border-r bg-neutral-950">
        <div className="px-12 pt-12 w-full inline-flex gap-2 items-center">
          <Logo size="sm" />
          <h1 className="text-xl font-semibold">Simple Finance</h1>
        </div>

        <div className="flex flex-col h-full justify-between">
          <NavLinks />

          <UserNav user={user} />
        </div>
      </div>
    </>
  );
}
