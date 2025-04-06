import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
import { enableMFA } from "@/lib/api/account";
import { useEffect, useState } from "react";
import Alert from "@/components/common/alert";
import Loading from "@/components/main/loading";

export default function MFAStepFour({
  setMfaEnabled,
}: {
  setMfaEnabled: (mfa: boolean) => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const init = async function () {
    setIsLoading(true);
    const response = await enableMFA();

    if (response.error) {
      setError(response.error);
    } else {
      setData(response.success);
      setMfaEnabled(true);
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

      {data && (
        <>
          <div className="flex flex-col gap-4">
            <CircleCheck size={36} className="text-green-500 mx-auto" />
            <p className="text-muted-foreground text-center">
              Setup is complete. You will be prompted for a code next time you
              sign in.
            </p>
          </div>
          <DialogFooter className="mt-2">
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </DialogFooter>
        </>
      )}
    </>
  );
}
