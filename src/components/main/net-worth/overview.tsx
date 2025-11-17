"use client";

import { Area, AreaChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { chartToolTipCurrency } from "@/components/main/chart-tooltip";
import { useOverview } from "@/hooks/net-worth/useOverview";

export default function Overview({
  data,
}: {
  data: NetWorthAssetsCollection[];
}) {
  const { currentMonth, netWorthDiff, chartData, monthlyMin, chartConfig } =
    useOverview(data);

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
              {formatCurrency(currentMonth.total, true, true)}
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
            <YAxis
              type="number"
              domain={[monthlyMin, "dataMax"]}
              allowDataOverflow={true}
              padding={{ top: 0, bottom: 20 }}
              hide
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
                  stopOpacity={0.5}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-data)"
                  stopOpacity={0}
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
