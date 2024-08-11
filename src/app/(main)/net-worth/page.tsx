import Assets from "@/components/main/net-worth/assets";
import MonthlyChange from "@/components/main/net-worth/monthly-change";
import Overview from "@/components/main/net-worth/overview";
import Details from "@/components/main/net-worth/details";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { LineChart } from "lucide-react";

export default function NetWorth() {
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
      <div className="flex flex-col gap-12">
        <Overview />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <MonthlyChange />
          <Assets />
        </div>
        <Details />
      </div>
    </main>
  );
}
