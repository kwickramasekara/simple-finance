import Assets from "@/components/main/net-worth/assets";
import MonthlyChange from "@/components/main/net-worth/monthly-change";
import Overview from "@/components/main/net-worth/overview";
import Details from "@/components/main/net-worth/details";
import Alert from "@/components/common/alert";
import AddAssets from "@/components/main/net-worth/add-assets";
import { LineChart } from "lucide-react";
import { getNetWorthAssetsByYear } from "@/lib/api/db";
import PageHeader from "@/components/main/page-header";

export default async function NetWorth() {
  const netWorthData = await getNetWorthAssetsByYear();

  return (
    <main>
      <PageHeader title="Net Worth" icon={LineChart}>
        <AddAssets />
      </PageHeader>

      {netWorthData === null || netWorthData?.length === 0 ? (
        <Alert className="max-w-[360px] mx-auto">No data available.</Alert>
      ) : (
        <div className="flex flex-col gap-12">
          <Overview data={netWorthData} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <MonthlyChange data={netWorthData} />
            <Assets data={netWorthData} />
          </div>
          <Details data={netWorthData} />
        </div>
      )}
    </main>
  );
}
