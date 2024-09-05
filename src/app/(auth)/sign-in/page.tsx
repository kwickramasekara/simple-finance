"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Alert from "@/components/common/alert";
import { signInAction } from "@/lib/api/account";
import { useFormState } from "react-dom";
import Submit from "@/components/forms/submit";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const MFA_ERROR =
    "More factors are required to complete the sign in process.";
  const router = useRouter();
  const initialState = {
    error: "",
  };
  const [state, formAction] = useFormState(signInAction, initialState);

  useEffect(() => {
    if (state.error === MFA_ERROR) router.push("/sign-in/mfa");
  }, [state.error]);

  return (
    <div className="mx-auto px-2 grid gap-10 min-w-[360px]">
      <div className="grid gap-2">
        <h2 className="text-4xl font-semibold">Sign In</h2>
        <p className="text-sm text-muted-foreground">
          Enter your credentials below to sign in to the account
        </p>
      </div>
      <div className="grid gap-4">
        <form action={formAction}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="me@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input name="password" type="password" required />
            </div>
            <Submit>Sign In</Submit>
            {state.error && state.error !== MFA_ERROR && (
              <Alert type="error">{state.error}</Alert>
            )}
          </div>
        </form>
      </div>
      <div className="grid gap-4 text-sm text-muted-foreground">
        <p>
          Don&apos;t have an account?
          <Link href="/sign-up" className="underline ml-1">
            Sign up
          </Link>
        </p>
        <p>
          Forgot password?
          <Link href="#" className="underline ml-1">
            Reset
          </Link>
        </p>
      </div>
    </div>
  );
}
