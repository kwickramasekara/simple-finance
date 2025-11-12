"use client";

import React, { use, useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import { useRouter } from "next/navigation";
import { createLinkToken } from "@/lib/api/plaid";
import { RefreshCw, Loader2 } from "lucide-react";

const PlaidReconnect = ({
  accessToken,
  userId,
}: {
  accessToken: string;
  userId: string;
}) => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(userId, accessToken);
      setToken(data?.linkToken);
    };

    getLinkToken();
  }, [accessToken]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(async () => {
    setProcessing(true);
    // After successful update, refresh the page to reload transactions
    router.refresh();
    setProcessing(false);
  }, [router]);

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <Button
      onClick={() => open()}
      disabled={!ready}
      variant="outline"
      size="sm"
      title="Reconnect"
    >
      {processing && <Loader2 className="animate-spin mr-2" size={16} />}
      {!processing && <RefreshCw size={16} className="mr-2" />}
    </Button>
  );
};

export default PlaidReconnect;
