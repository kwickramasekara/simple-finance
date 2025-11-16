import { useMemo } from "react";
import { ChartConfig } from "@/components/ui/chart";
import assetsMap from "@/lib/maps/assets";

/**
 * Custom hook to process net worth assets data for chart visualization.
 *
 * @param data - The collection of net worth assets.
 * @returns An object containing chart data and chart configuration.
 */
export function useAssets(data: NetWorthAssetsCollection[]) {
  return useMemo(() => {
    const latestData = data[data.length - 1];
    const chartData: {
      asset: string;
      value: number;
      fill: string;
    }[] = [];

    const chartConfig: ChartConfig = {
      value: {
        label: "Value",
      },
    };

    Object.entries(latestData).forEach(([key, value], index) => {
      if (key.startsWith("$") || key === "date" || value === null) return;
      chartConfig[key] = {
        label: assetsMap[key] ?? key,
        color: `hsl(var(--chart-${index}))`,
      };

      chartData.push({
        asset: key,
        value: value as number,
        fill: chartConfig[key]?.color ?? "#fff",
      });
    });

    return { chartData, chartConfig };
  }, [data]);
}
