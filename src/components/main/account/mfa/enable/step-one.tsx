import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect } from "react";

export default function MFAStepOne({
  stepper,
  qr,
  secret,
}: {
  stepper: (step: number) => void;
  qr: string;
  secret: string;
}) {
  return (
    <>
      <div className="flex flex-col gap-4">
        <strong className="-mb-2">TOTP</strong>
        <p className="text-sm text-muted-foreground">
          Open your preferred authenticator app and choose to scan the QR code.
        </p>
        <img
          width="160"
          height="160"
          className="mx-auto mt-4"
          src={`data:image/png;base64,${qr}`}
        />
        <Accordion type="single" collapsible className="w-full ">
          <AccordionItem value="item-1" className="border-0">
            <AccordionTrigger className="text-sm text-muted-foreground font-normal text-left outline-none">
              OR, copy the code manually
            </AccordionTrigger>
            <AccordionContent>
              <div
                className="font-mono text-sm text-muted-foreground border p-2 rounded-md break-all"
                title="Click to copy"
              >
                {secret}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <DialogFooter className="mt-2">
        <DialogClose asChild>
          <Button variant="ghost">Cancel</Button>
        </DialogClose>
        <Button type="submit" onClick={() => stepper(2)} tabIndex={1}>
          Next
        </Button>
      </DialogFooter>
    </>
  );
}
