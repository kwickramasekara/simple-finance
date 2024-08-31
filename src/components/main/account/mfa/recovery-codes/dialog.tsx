"use client";

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import MFARegerateCodesStepOne from "./step-one";
import MFARegerateCodesStepTwo from "./step-two";
import { useState } from "react";

export default function MFARecoveryCodesDialog() {
  const [step, setStep] = useState(1);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Regenerate</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Regenerate recovery codes</DialogTitle>
          <DialogDescription>Step {step} of 2</DialogDescription>
        </DialogHeader>
        {step === 1 && <MFARegerateCodesStepOne stepper={setStep} />}
        {step === 2 && <MFARegerateCodesStepTwo />}
        <DialogFooter className="mt-2">
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
