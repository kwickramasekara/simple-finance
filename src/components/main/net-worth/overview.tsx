"use client";

import { Area, AreaChart, XAxis } from "recharts";
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
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn, formatCurrency, getMonthlyNetWorthTotals } from "@/lib/utils";
import { chartToolTipCurrency } from "@/components/main/chart-tooltip";

export default function Overview({
  data,
}: {
  data: NetWorthAssetsCollection[];
}) {
  const monthlyTotals = getMonthlyNetWorthTotals(data);
  const lastMonth = monthlyTotals[monthlyTotals.length - 1];
  const secondLastMonth = monthlyTotals[monthlyTotals.length - 2];
  const netWorthDiff = lastMonth.total - secondLastMonth?.total || 0;

  const chartConfig = {
    data: {
      label: "Net Worth",
      color: netWorthDiff >= 0 ? "hsl(var(--chart-1))" : "hsl(var(--chart-5))",
    },
    total: {
      label: "Net Worth",
    },
  } satisfies ChartConfig;
  const chartData = monthlyTotals;

  return (
    <Card>
      <CardHeader>
        <div className="flex gap-2 justify-between">
          <div>
            <CardTitle className="text-xl">Overview</CardTitle>
            <CardDescription className="sm:block !mt-0">
              Monthly net worth change
            </CardDescription>
          </div>
          <div className="flex flex-col">
            <p className="font-mono font-bold text-xl text-right">
              {formatCurrency(lastMonth.total, true, true)}
            </p>
            {netWorthDiff !== 0 && (
              <Badge
                variant="outline"
                className={cn("font-mono", {
                  "text-green-500 border-green-500": netWorthDiff > 0,
                  "text-destructive border-destructive": netWorthDiff < 0,
                })}
              >
                {netWorthDiff > 0 ? (
                  <TrendingUp size={12} className="mr-2" />
                ) : (
                  <TrendingDown size={12} className="mr-2" />
                )}
                {formatCurrency(netWorthDiff, true, true)}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="h-48 sm:h-60 md:h-64 lg:h-72 w-full"
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 48,
            }}
          >
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={true}
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

            <defs>
              <linearGradient id="fillChart" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-data)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-data)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="total"
              type="natural"
              fill="url(#fillChart)"
              fillOpacity={0.4}
              stroke="var(--color-data)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
