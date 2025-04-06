import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { createMFARecoveryCodes } from "@/lib/api/account";
import Alert from "@/components/common/alert";
import Loading from "@/components/main/loading";

export default function MFAStepThree({
  stepper,
}: {
  stepper: (step: number) => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [codes, setCodes] = useState<string[]>([]);

  const init = async function () {
    setIsLoading(true);
    const response = await createMFARecoveryCodes();
    if (response.error) {
      setError(response.error);
    } else {
      setCodes(JSON.parse(response.success));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      {error && <Alert>{error}</Alert>}

      {isLoading && <Loading />}

      {codes.length > 0 && (
        <>
          <div className="flex flex-col gap-4">
            <strong className="-mb-2">Recovery codes</strong>
            <p className="text-muted-foreground">
              Please save these recovery codes in a safe place. These codes can
              be used to access your account if you lose access to the MFA
              device.
            </p>
            <div className="border rounded-md grid grid-cols-3 text-muted-foreground font-mono py-4 px-2 text-center gap-6">
              {codes.map((code, index) => (
                <div key={index}>{code}</div>
              ))}
            </div>
            <p className=" text-muted-foreground">
              Once you have saved the codes, you have completed the MFA setup.
              You will be prompted for a code next time you sign in.
            </p>
          </div>
        </>
      )}
      <DialogFooter className="mt-2">
        <Button type="submit" onClick={() => stepper(4)}>
          Next
        </Button>
      </DialogFooter>
    </>
  );
}
