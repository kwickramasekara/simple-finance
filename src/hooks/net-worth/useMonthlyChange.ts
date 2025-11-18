import currency from "currency.js";
import { useMemo } from "react";
import { getMonthlyNetWorthTotals } from "@/lib/utils";

/**
 * Custom hook to calculate monthly net worth changes for charting.
 *
 * @param data - The collection of net worth assets.
 * @returns An array of objects containing the month and the difference from the previous month.
 */
export function useMonthlyChange(data: NetWorthAssetsCollection[]) {
  return useMemo(() => {
    const monthlyTotals = getMonthlyNetWorthTotals(data);
    const chartData: { month: string; difference: number }[] = [];

    monthlyTotals.forEach((item, index) => {
      if (index === 0) return;
      const difference = currency(item.total).subtract(
        monthlyTotals[index - 1].total
      ).value;
      chartData.push({ month: item.month, difference: Math.round(difference) });
    });

    return {
      chartData,
      notEnoughData: chartData.length < 2,
    };
  }, [data]);
}
