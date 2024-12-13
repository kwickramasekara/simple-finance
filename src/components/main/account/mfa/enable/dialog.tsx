"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import MFAStepOne from "./step-one";
import MFAStepTwo from "./step-two";
import MFAStepThree from "./step-three";
import MFAStepFour from "./step-four";
import { createMFA } from "@/lib/api/account";
import Alert from "@/components/common/alert";
import Loading from "@/components/main/loading";

export default function MFEnableDialog({
  isOpen,
  setIsOpen,
  setMfaEnabled,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setMfaEnabled: (mfa: boolean) => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [step, setStep] = useState(1);

  const init = async function () {
    setIsLoading(true);
    const response = await createMFA();

    if (response.error) {
      setError(response.error);
    } else {
      setData(JSON.parse(response.success));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen) init();
    else {
      // Reset the state on close of dialog.
      // This is important to prevent the dialog from showing the previous state when opened again.
      setData(null);
      setStep(1);
    }
  }, [isOpen]);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        noCloseButton
        className="sm:max-w-[425px]"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Multi-factor Authentication</DialogTitle>
          <DialogDescription>Step {step} of 4</DialogDescription>
        </DialogHeader>
        {error && (
          <>
            <Alert type="error">{error}</Alert>
            <DialogFooter className="mt-2">
              <DialogClose asChild>
                <Button>Close</Button>
              </DialogClose>
            </DialogFooter>
          </>
        )}

        {isLoading && <Loading />}

        {step === 1 && data && !error && (
          <MFAStepOne stepper={setStep} qr={data.qr} secret={data.secret} />
        )}
        {step === 2 && data && !error && <MFAStepTwo stepper={setStep} />}
        {step === 3 && data && !error && <MFAStepThree stepper={setStep} />}
        {step === 4 && data && !error && (
          <MFAStepFour setMfaEnabled={setMfaEnabled} />
        )}
      </DialogContent>
    </Dialog>
  );
}
