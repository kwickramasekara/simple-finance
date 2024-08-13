import Assets from "@/components/main/net-worth/assets";
import MonthlyChange from "@/components/main/net-worth/monthly-change";
import Overview from "@/components/main/net-worth/overview";
import Details from "@/components/main/net-worth/details";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { LineChart } from "lucide-react";
import { getNetWorthAssetsByYear } from "@/lib/actions/db";
import Alert from "@/components/common/alert";
// import { revalidatePath } from "next/cache";

export default async function NetWorth() {
  const netWorthData = await getNetWorthAssetsByYear();

  // revalidatePath("/net-worth");
  return (
    <main>
      <div className="flex justify-between items-center mb-12">
        <div className="flex">
          <LineChart className="mr-2" />
          <h1 className="text-xl font-semibold">Net Worth</h1>
        </div>

        <Button>
          <CirclePlus size={16} className="mr-2" />
          Add
        </Button>
      </div>
      {netWorthData === null || netWorthData?.length === 0 ? (
        <Alert type="error" className="max-w-[360px] mx-auto">
          No data available.
        </Alert>
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
