import { Unplug } from "lucide-react";
import PlaidLink from "@/components/main/plaid-link";
import { getSignedInUser } from "@/lib/appwrite";
import { getInstitutionConnectionData } from "@/lib/api/db";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import PageHeader from "@/components/main/page-header";
import ConnectionsList from "@/components/main/connections/connections-list";

export default async function Connections() {
  const user = await getSignedInUser();
  const connections = await getInstitutionConnectionData();

  return (
    <main>
      <PageHeader title="Connections" icon={Unplug}>
        {user && <PlaidLink userId={user.$id} path="/connections" />}
      </PageHeader>

      {!connections ||
        (connections.length === 0 && (
          <Alert>
            <AlertTitle>No connections!</AlertTitle>
            <AlertDescription className="text-muted-foreground">
              Please add your financial institutions to view transactions and
              other financial data.
            </AlertDescription>
          </Alert>
        ))}

      {connections && <ConnectionsList data={connections} />}
    </main>
  );
}
