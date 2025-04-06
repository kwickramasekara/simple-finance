"use client";

import Link from "next/link";
import { signUpAction } from "@/lib/api/account";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState, useFormStatus } from "react-dom";
import Alert from "@/components/common/alert";
import Submit from "@/components/forms/submit";

export default function SignUp() {
  const initialState = {
    error: "",
  };
  const [state, formAction] = useFormState(signUpAction, initialState);

  return (
    <div className="mx-auto px-2 grid gap-10 min-w-[360px]">
      <div className="grid gap-2">
        <h2 className="text-4xl font-semibold">Sign Up</h2>
        <p className="text-sm text-muted-foreground">
          Enter your details below to create an account
        </p>
      </div>
      <form action={formAction}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Name</Label>
            <Input name="name" type="text" placeholder="Jane" required />
          </div>
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
            <Input name="password" type="password" minLength={8} required />
          </div>
          <Submit>Sign Up</Submit>
          {state.error && <Alert>{state.error}</Alert>}
        </div>
      </form>
      <div className="grid gap-4 text-sm text-muted-foreground">
        <p>
          Already have an account?{" "}
          <Link href="/sign-in" className="underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
