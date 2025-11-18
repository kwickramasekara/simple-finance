import { Unplug } from "lucide-react";
import PlaidLink from "@/components/main/connections/plaid-link";
import { getSignedInUser } from "@/lib/appwrite";
import { getInstitutionConnectionData } from "@/lib/api/db";
import PageHeader from "@/components/main/page-header";
import ConnectionsList from "@/components/main/connections/connections-list";
import NoData from "@/components/common/no-data";

export default async function Connections() {
  const user = await getSignedInUser();
  const connections = await getInstitutionConnectionData();

  return (
    <main>
      <PageHeader title="Connections" icon={Unplug}>
        {user && <PlaidLink userId={user.$id} path="/connections" />}
      </PageHeader>

      {(!connections || connections.length === 0) && (
        <NoData
          title="No connections found"
          description="Please add your financial institutions to view transactions and other financial data."
        />
      )}

      {connections && user && (
        <ConnectionsList data={connections} userId={user.$id} />
      )}
    </main>
  );
}
