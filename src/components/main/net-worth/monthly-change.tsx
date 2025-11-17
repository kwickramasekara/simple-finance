"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatCurrency } from "@/lib/utils";
import { chartToolTipCurrency } from "@/components/main/chart-tooltip";
import { useMonthlyChange } from "@/hooks/net-worth/useMonthlyChange";

const chartConfig = {
  difference: {
    label: "Difference",
  },
} satisfies ChartConfig;

export default function MonthlyChange({
  data,
}: {
  data: NetWorthAssetsCollection[];
}) {
  const chartData = useMonthlyChange(data);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Monthly Change</CardTitle>
        <CardDescription className="!mt-0">
          Difference in net worth from the previous month
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 16,
            }}
          >
            <defs>
              <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="50%"
                  stopColor="hsl(var(--chart-1))"
                  stopOpacity={1}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--chart-3))"
                  stopOpacity={0.9}
                />
              </linearGradient>
              <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--chart-3))"
                  stopOpacity={0.9}
                />
                <stop
                  offset="50%"
                  stopColor="hsl(var(--chart-5))"
                  stopOpacity={1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(value, name) =>
                    chartToolTipCurrency(
                      value as number,
                      name as string,
                      chartConfig
                    )
                  }
                />
              }
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis padding={{ bottom: 20 }} hide />
            <Bar dataKey="difference" radius={5}>
              <LabelList
                position="top"
                dataKey="difference"
                fillOpacity={1}
                fill="hsl(var(--primary))"
                formatter={(value: number) =>
                  formatCurrency(value as number, true, true)
                }
              />
              {chartData.map((item) => (
                <Cell
                  key={item.month}
                  fill={
                    item.difference > 0
                      ? "url(#colorPositive)"
                      : "url(#colorNegative)"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
