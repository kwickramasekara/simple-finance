"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Alert from "@/components/common/alert";
import { OctagonAlert } from "lucide-react";
import { signInAction } from "@/lib/actions/auth";
import { useFormState, useFormStatus } from "react-dom";
import Submit from "@/components/forms/submit";

export default function SignIn() {
  const initialState = {
    error: "",
  };
  const [state, formAction] = useFormState(signInAction, initialState);

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
            <Submit formStatus={useFormStatus}>Sign In</Submit>
            {state.error && (
              <Alert type="error" className="max-w-[360px]">
                {state.error}
              </Alert>
            )}
          </div>
        </form>
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
  );
}
