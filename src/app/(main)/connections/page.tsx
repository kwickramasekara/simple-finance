import { Unplug } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import PlaidLink from "@/components/main/plaid-link";
import { getSignedInUser } from "@/lib/appwrite";
import { Button } from "@/components/ui/button";
import { Trash, Pencil } from "lucide-react";
import { getInstitutionConnectionData } from "@/lib/api/db";
import CreditCard from "@/components/main/credit-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getOrdinalSuffix } from "@/lib/utils";
import PageHeader from "@/components/main/page-header";

export default async function Connections() {
  const user = await getSignedInUser();
  const connections = await getInstitutionConnectionData();

  return (
    <main>
      <PageHeader
        title="Connections"
        icon={Unplug}
        children={user && <PlaidLink userId={user.$id} path="/connections" />}
      />

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

      <div className="flex flex-col gap-4">
        {connections &&
          connections.map((connection) => (
            <Card key={connection.$id}>
              <CardContent className="p-10">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex w-1/2 items-center space-x-4">
                    <CreditCard
                      mask={connection.mask}
                      logo={connection.institution_logo}
                      bgColor={connection.institution_color}
                    />

                    <div>
                      <p className="font-medium">
                        {connection.given_name ||
                          connection.official_name ||
                          connection.name}
                      </p>
                      <p className="text-muted-foreground">
                        {connection.institution_name}
                      </p>
                    </div>
                  </div>

                  <div className="w-1/4 text-center">
                    <p>
                      {connection.billing_cycle &&
                        `${connection.billing_cycle}${getOrdinalSuffix(
                          connection.billing_cycle
                        )}`}
                    </p>
                    <p className="text-muted-foreground">Billing Cycle</p>
                  </div>

                  <div className="flex w-1/4 gap-4 justify-end">
                    <Button variant="outline" size="icon">
                      <Pencil size={16} />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Trash size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </main>
  );
}
