import PageHeader from "@/components/main/page-header";
import { Wallet } from "lucide-react";

export default async function Expenses() {
  return (
    <main>
      <PageHeader title="Expenses" icon={Wallet} />
    </main>
  );
}
