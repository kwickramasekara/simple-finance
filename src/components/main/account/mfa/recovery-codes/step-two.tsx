import Alert from "@/components/common/alert";
import { regenerateRecoveryCodes } from "@/lib/api/account";
import { useEffect, useState } from "react";
import Loading from "@/components/common/loading";

export default function MFARegerateCodesStepTwo() {
  const [error, setError] = useState<string | null>(null);
  const [codes, setCodes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const init = async function () {
    setIsLoading(true);
    const response = await regenerateRecoveryCodes();
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
      {error && <Alert type="error">{error}</Alert>}

      {isLoading && <Loading />}

      {codes.length > 0 && (
        <>
          <p className="text-sm text-muted-foreground">
            Please save these recovery codes in a safe place. These codes can be
            used to access your account if you lose access to the MFA device.
          </p>
          <div className="border rounded-md grid grid-cols-3 text-sm text-muted-foreground font-mono py-4 px-2 text-center gap-6">
            {codes.map((code, index) => (
              <div key={index}>{code}</div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
