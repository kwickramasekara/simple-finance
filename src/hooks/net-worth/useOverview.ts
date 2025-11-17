import { useMemo } from "react";
import { ChartConfig } from "@/components/ui/chart";
import { getMonthlyNetWorthTotals } from "@/lib/utils";
import currency from "currency.js";

/**
 * Custom hook to calculate net worth overview data.
 *
 * @param data - The collection of net worth assets.
 * @returns An object containing monthly totals, current month, previous month, net worth difference, chart data, and monthly minimum.
 */
export function useOverview(data: NetWorthAssetsCollection[]) {
  return useMemo(() => {
    const monthlyTotals = getMonthlyNetWorthTotals(data);
    const currentMonth = monthlyTotals[monthlyTotals.length - 1];
    const prevMonth = monthlyTotals[monthlyTotals.length - 2];
    const netWorthDiff = currency(currentMonth.total).subtract(
      prevMonth?.total || 0
    ).value;
    const chartData = monthlyTotals;
    const monthlyMin = Math.min(...monthlyTotals.map((obj) => obj.total));

    const chartConfig = {
      data: {
        label: "Net Worth",
        color:
          netWorthDiff >= 0 ? "hsl(var(--chart-1))" : "hsl(var(--chart-5))",
      },
      total: {
        label: "Net Worth",
      },
    } satisfies ChartConfig;

    return {
      monthlyTotals,
      currentMonth,
      prevMonth,
      netWorthDiff,
      chartData,
      monthlyMin,
      chartConfig,
    };
  }, [data]);
}
