"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface GeneralCardProps {
  initialName: string;
  initialEmail: string;
}

export default function GeneralCard({
  initialName,
  initialEmail,
}: GeneralCardProps) {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);

  return (
    <Card>
      <CardHeader>
        <CardTitle>General</CardTitle>
        <CardDescription>Basic details about your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-8">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="********" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button disabled>Update</Button>
      </CardFooter>
    </Card>
  );
}
