"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import MFARecoveryCodesDialog from "@/components/main/account/mfa/recovery-codes/dialog";
import MFAEnableDialog from "@/components/main/account/mfa/enable/dialog";
import MFADisableDialog from "@/components/main/account/mfa/disable/dialog";
import { useState } from "react";

interface SecurityCardProps {
  initialMfa: boolean;
}

export default function SecurityCard({ initialMfa }: SecurityCardProps) {
  const [mfa, setMfa] = useState<boolean>(initialMfa);
  const [mfaEnableDialogOpen, setMfaEnableDialogOpen] = useState(false);
  const [mfaDisableDialogOpen, setMfaDisableDialogOpen] = useState(false);

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

  return (
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
                Use an authentication app to generate MFA codes as a second form
                of verification.
              </p>
            </div>
            <div className="flex-1 text-right">
              <Switch id="mfa" checked={mfa} onMouseDown={handleMFASwitch} />
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
  );
}
