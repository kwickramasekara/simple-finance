"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import assetsMap from "@/lib/maps/assets";

export default function Assets({ data }: { data: NetWorthAssetsCollection }) {
  let chartData: {
    asset: string;
    value: number;
    fill: string;
  }[] = [];

  let chartConfig: any = {
    value: {
      label: "Value",
    },
  } satisfies ChartConfig;

  Object.entries(data).forEach(([key, value], index) => {
    if (key === "$id" || key === "date") return;
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

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl">Assets</CardTitle>
        <CardDescription className="!mt-0">
          Asset spread across the total net worth
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] [&_.recharts-wrapper]:-top-3"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="asset" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:justify-center"
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="asset"
              innerRadius={60}
              startAngle={90}
              endAngle={450}
              paddingAngle={4}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
