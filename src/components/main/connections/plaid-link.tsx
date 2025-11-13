// https://github.com/adrianhajdin/banking/blob/b8d5a8e934c113172f14f020dced6f9e097ad67e/components/PlaidLink.tsx
"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import { useRouter } from "next/navigation";
import { createLinkToken, processConnection } from "@/lib/api/plaid";
import { CirclePlus, Loader2 } from "lucide-react";

const PlaidLink = ({ userId, path }: { userId: string; path: string }) => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(userId);

      setToken(data?.linkToken);
    };

    getLinkToken();
  }, [userId]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      setProcessing(true);

      await processConnection({
        publicToken: public_token,
      });

      router.push(path);

      setProcessing(false);
    },
    [userId]
  );

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <Button onClick={() => open()} disabled={!ready}>
      {processing && <Loader2 className="animate-spin" />}
      {!processing && (
        <>
          <CirclePlus size={16} className="mr-2" />
          Add
        </>
      )}
    </Button>
  );
};

export default PlaidLink;
