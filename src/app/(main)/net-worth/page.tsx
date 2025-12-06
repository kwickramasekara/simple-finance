import Assets from "@/components/main/net-worth/assets";
import MonthlyChange from "@/components/main/net-worth/monthly-change";
import Overview from "@/components/main/net-worth/overview";
import Details from "@/components/main/net-worth/details";
import AddAssets from "@/components/main/net-worth/add-assets";
import YearDropdown from "@/components/main/net-worth/year-dropdown";
import { LineChart } from "lucide-react";
import {
  getNetWorthAssetsByYear,
  getAvailableNetWorthYears,
} from "@/lib/api/db";
import PageHeader from "@/components/main/page-header";
import { redirect } from "next/navigation";
import NoData from "@/components/common/no-data";

interface NetWorthProps {
  searchParams: Promise<{ year?: string }>;
}

const NoDataView = () => {
  return (
    <main>
      <PageHeader title="Net Worth" icon={LineChart}>
        <div className="flex gap-2">
          <AddAssets />
        </div>
      </PageHeader>

      <NoData description="Please add assets to start tracking your net worth." />
    </main>
  );
};

export default async function NetWorth(props: NetWorthProps) {
  const searchParams = await props.searchParams;
  const availableYears = await getAvailableNetWorthYears();

  // If no years available, show no data message
  if (!availableYears || availableYears.length === 0) return <NoDataView />;

  // Get the year from URL params or default to latest year
  const selectedYear = searchParams.year || availableYears[0];

  // Redirect to include year in URL if not present
  if (!searchParams.year) redirect(`/net-worth?year=${selectedYear}`);

  const netWorthData = await getNetWorthAssetsByYear(selectedYear);

  if (!netWorthData || netWorthData.length === 0) return <NoDataView />;

  return (
    <main>
      <PageHeader title="Net Worth" icon={LineChart}>
        <div className="flex gap-2">
          <AddAssets />
          <YearDropdown
            availableYears={availableYears}
            selectedYear={selectedYear}
          />
        </div>
      </PageHeader>

      <div className="flex flex-col gap-12">
        <Overview data={netWorthData} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <MonthlyChange data={netWorthData} />
          <Assets data={netWorthData} />
        </div>
        <Details data={netWorthData} />
      </div>
    </main>
  );
}
