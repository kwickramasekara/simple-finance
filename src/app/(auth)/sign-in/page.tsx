import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/shared/logo";

export default function SignIn() {
  return (
    <div className="w-full grid lg:grid-cols-2 h-screen">
      <div className="hidden lg:block border-r">
        <div className="flex items-center justify-center h-screen">
          <div className="grid gap-4 text-center">
            <Logo size="lg" />
            <h1 className="text-4xl font-semibold">Simple Finance</h1>
            <p className="text-muted-foreground">
              The home of your personal finance
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto px-2 grid gap-10 min-w-[360px]">
          <div className="grid gap-2">
            <h2 className="text-4xl font-semibold">Sign In</h2>
            <p className="text-sm text-muted-foreground">
              Enter your credentials below to sign in to the account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="me@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </div>
          <div className="grid gap-4 text-sm text-muted-foreground">
            <p>
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="underline">
                Sign up
              </Link>
            </p>
            <p>
              Forgot password?{" "}
              <Link href="#" className="underline">
                Reset
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
