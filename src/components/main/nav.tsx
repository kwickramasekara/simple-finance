"use client";

import { Models } from "node-appwrite";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Logo from "@/components/common/logo";
import {
  LogOut,
  SquareUserRound,
  Menu,
  LayoutDashboard,
  LineChart,
  PiggyBank,
  Unplug,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
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
import { signOut } from "@/lib/api/account";
import React from "react";

async function handleSignOut() {
  await signOut();
}

function NavLinks({
  setDrawerOpen,
}: {
  setDrawerOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const path = usePathname();

  const links = [
    {
      href: "/dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
    },
    {
      href: "/expenses",
      icon: Wallet,
      label: "Expenses",
    },
    {
      href: "/net-worth",
      icon: LineChart,
      label: "Net Worth",
    },
    {
      href: "/retirement",
      icon: PiggyBank,
      label: "Retirement",
    },
  ];

  return (
    <nav className="w-full p-12 flex flex-col gap-6">
      {links.map(({ href, icon, label }) => (
        <Link
          key={label}
          onClick={() => setDrawerOpen && setDrawerOpen(false)}
          href={href}
          className={cn(
            "flex gap-2 text-muted-foreground font-medium hover:text-foreground",
            path === href && "text-foreground"
          )}
        >
          {React.createElement(icon)}
          {label}
        </Link>
      ))}
    </nav>
  );
}

function UserNav({
  user,
  setDrawerOpen,
}: {
  user: Models.User<Models.Preferences> | null;
  setDrawerOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="w-full p-12 lg:fixed lg:bottom-0">
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
          <Link
            href="/account"
            onClick={() => setDrawerOpen && setDrawerOpen(false)}
          >
            <DropdownMenuItem className="cursor-pointer text-base">
              <SquareUserRound size={16} className="mr-2" />
              Account
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <Link
            href="/connections"
            onClick={() => setDrawerOpen && setDrawerOpen(false)}
          >
            <DropdownMenuItem className="cursor-pointer text-base">
              <Unplug size={16} className="mr-2" />
              Connections
            </DropdownMenuItem>
          </Link>
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
  const [open, setOpen] = React.useState(false);

  return (
    <Drawer open={open}>
      <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
        <Menu />
      </Button>

      <DrawerContent>
        <NavLinks setDrawerOpen={setOpen} />
        <UserNav user={user} setDrawerOpen={setOpen} />
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
