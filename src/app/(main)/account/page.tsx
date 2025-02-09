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
import { SquareUserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { getAccount } from "@/lib/api/account";
import Loading from "@/components/main/loading";
import { Switch } from "@/components/ui/switch";
import MFARecoveryCodesDialog from "@/components/main/account/mfa/recovery-codes/dialog";
import Alert from "@/components/common/alert";
import MFAEnableDialog from "@/components/main/account/mfa/enable/dialog";
import MFADisableDialog from "@/components/main/account/mfa/disable/dialog";

export default function Account() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [account, setAccount] = useState<any | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mfa, setMfa] = useState<boolean>(false);
  const [mfaEnableDialogOpen, setMfaEnableDialogOpen] = useState(false);
  const [mfaDisableDialogOpen, setMfaDisableDialogOpen] = useState(false);

  const init = async function () {
    setLoading(true);

    const res = await getAccount();

    if (res.error) {
      setError(res.error);
    } else {
      setAccount(JSON.parse(res.success));
      setName(JSON.parse(res.success).name);
      setEmail(JSON.parse(res.success).email);
      setMfa(JSON.parse(res.success).mfa);
    }

    setLoading(false);
  };

  const handleMFASwitch = async function (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    const isPrimaryButton = event.buttons === 1;

    if (isPrimaryButton) {
      event.preventDefault();

      if (mfa) setMfaDisableDialogOpen(true);
      else setMfaEnableDialogOpen(true);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <main>
      <div className="flex mb-12">
        <SquareUserRound className="mr-2" />
        <h1 className="text-xl font-semibold">Account</h1>
      </div>
      {error && <Alert type="error">{error}</Alert>}

      {loading && <Loading />}

      {account && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Card>
            <CardHeader>
              <CardTitle>General</CardTitle>
              <CardDescription>
                Basic details about your account.
              </CardDescription>
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

          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>
                Multi-factor authentication can make your account more secure.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex items-center space-x-4">
                  <div>
                    <Label htmlFor="mfa">Multi-factor authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Use an authentication app to generate MFA codes as a
                      second form of verification.
                    </p>
                  </div>
                  <div className="flex-1 text-right">
                    <Switch
                      id="mfa"
                      checked={mfa}
                      onMouseDown={handleMFASwitch}
                    />
                    <MFAEnableDialog
                      isOpen={mfaEnableDialogOpen}
                      setIsOpen={setMfaEnableDialogOpen}
                      setMfaEnabled={setMfa}
                    />
                    <MFADisableDialog
                      isOpen={mfaDisableDialogOpen}
                      setIsOpen={setMfaDisableDialogOpen}
                      setMfaEnabled={setMfa}
                    />
                  </div>
                </div>
                {mfa && (
                  <div className="flex items-center space-x-4">
                    <div>
                      <Label htmlFor="mfa">Recovery codes</Label>
                      <p className="text-sm text-muted-foreground">
                        Use in case you can&apos;t receive MFA codes.
                      </p>
                    </div>
                    <div className="flex-1 text-right">
                      <MFARecoveryCodesDialog />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  );
}
