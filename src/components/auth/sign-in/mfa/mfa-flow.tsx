"use client";

import Alert from "@/components/common/alert";
import {
  createMFAChallenge,
  verifyMFAChallengeAction,
} from "@/lib/api/account";
import { useEffect, useState } from "react";
import { useActionState } from "react";
import OTP from "@/components/forms/otp";
import { useRouter } from "next/navigation";
import Loading from "@/components/main/loading";

export default function MFAFlow({ recovery = false }: { recovery?: boolean }) {
  const router = useRouter();
  const initialState = {
    error: "",
    success: false,
  };
  const [state, formAction] = useActionState(
    verifyMFAChallengeAction,
    initialState,
  );
  const [challengeError, setChallengeError] = useState<string | null>(null);
  const [challengeId, setChallengeId] = useState(undefined);
  const [isLoading, setLoading] = useState(false);

  const init = async function () {
    setLoading(true);

    // reset
    setChallengeId(undefined);
    setChallengeError(null);
    state.success = initialState.success;
    state.error = initialState.error;

    const response = await createMFAChallenge(recovery);
    if (response.error) {
      setChallengeError(response.error);
    } else {
      setChallengeId(response.success);
    }

    setLoading(false);
  };

  useEffect(() => {
    init();
  }, [recovery]);

  useEffect(() => {
    if (state.success) router.push("/dashboard");
  }, [state.success]);

  return (
    <>
      {challengeId && (
        <>
          <form action={formAction}>
            <input type="hidden" name="challengeId" value={challengeId} />
            <OTP recovery={recovery} />
          </form>
          {state.error && <Alert>{state.error}</Alert>}
        </>
      )}

      {isLoading && <Loading />}

      {challengeError && <Alert>{challengeError}</Alert>}
    </>
  );
}
