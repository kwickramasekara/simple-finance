import PageHeader from "@/components/main/page-header";
import { LayoutDashboard } from "lucide-react";

export default async function Dashboard() {
  return (
    <main>
      <PageHeader title="Dashboard" icon={LayoutDashboard} />
    </main>
  );
}
