import { getAccountAction } from "@/lib/api/account";
import Alert from "@/components/common/alert";
import GeneralCard from "@/components/main/account/general-card";
import SecurityCard from "@/components/main/account/security-card";
import PageHeader from "@/components/main/page-header";
import { SquareUserRound } from "lucide-react";

export default async function Account() {
  const res = await getAccountAction();
  const account = res.success ? JSON.parse(res.success) : null;

  return (
    <main>
      <PageHeader title="Account" icon={SquareUserRound} />

      {res.error && <Alert>{res.error}</Alert>}

      {account && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <GeneralCard
            initialName={account.name}
            initialEmail={account.email}
          />
          <SecurityCard initialMfa={account.mfa} />
        </div>
      )}
    </main>
  );
}
