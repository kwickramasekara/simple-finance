"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Models } from "node-appwrite";
import { Button } from "@/components/ui/button";
import { RefreshCw, Loader2 } from "lucide-react";
import { createUpdateLinkToken } from "@/lib/api/plaid";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";

type ConnectionStatus = {
  checking: boolean;
  error: string | null;
};

interface PlaidRelinkProps {
  connection: Models.Document;
  userId: string;
  connectionStatus: ConnectionStatus;
  reconnectingConnection: string | null;
  setReconnectingConnection: (id: string | null) => void;
}

export default function PlaidRelink({
  connection,
  userId,
  connectionStatus,
  reconnectingConnection,
  setReconnectingConnection,
}: PlaidRelinkProps) {
  const [token, setToken] = useState("");
  const [processing, setProcessing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (reconnectingConnection === connection.$id) {
      const getLinkToken = async () => {
        const data = await createUpdateLinkToken(
          userId,
          connection.access_token
        );
        setToken(data?.linkToken);
      };
      getLinkToken();
    }
  }, [reconnectingConnection, connection.$id, connection.access_token, userId]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      setProcessing(true);
      // Refresh the page to show updated status
      router.refresh();
      setProcessing(false);
      setReconnectingConnection(null);
    },
    [router, setReconnectingConnection]
  );

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  useEffect(() => {
    if (ready && reconnectingConnection === connection.$id && !processing) {
      open();
    }
  }, [ready, reconnectingConnection, connection.$id, processing, open]);

  if (!connectionStatus.error) return null;

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setReconnectingConnection(connection.$id)}
      disabled={processing || reconnectingConnection === connection.$id}
      title="Reconnect account"
    >
      {processing || reconnectingConnection === connection.$id ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <RefreshCw size={16} />
      )}
    </Button>
  );
}
