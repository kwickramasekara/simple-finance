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
import { TrendingUp } from "lucide-react";

const chartData = [
  { month: "January", data: 477483 },
  { month: "February", data: 494296 },
  { month: "March", data: 512779 },
  { month: "April", data: 508339 },
  { month: "May", data: 531708 },
  { month: "June", data: 543962 },
  { month: "July", data: 556279 },
  { month: "August", data: 570494 },
  { month: "September", data: 568287 },
  { month: "October", data: 582676 },
  { month: "November", data: 580467 },
  { month: "December", data: 594676 },
];

const chartConfig = {
  data: {
    label: "Net Worth",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function Overview() {
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
            <p className="font-mono font-bold text-xl text-right">$507K</p>
            <Badge
              variant="outline"
              className="font-mono text-green-500 border-green-500"
            >
              <TrendingUp size={12} className="mr-2" />
              $14K
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-72 w-full">
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
              content={<ChartTooltipContent hideIndicator={true} />}
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
              dataKey="data"
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
