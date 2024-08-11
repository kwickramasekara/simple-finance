"use client";

import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis } from "recharts";

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
const chartData = [
  { month: "January", visitors: 186 },
  { month: "February", visitors: 205 },
  { month: "March", visitors: -207 },
  { month: "April", visitors: 173 },
  { month: "May", visitors: -209 },
  { month: "June", visitors: 214 },
  { month: "July", visitors: 186 },
  { month: "August", visitors: 205 },
  { month: "September", visitors: -207 },
  { month: "October", visitors: 173 },
  { month: "November", visitors: -209 },
  { month: "December", visitors: 214 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
} satisfies ChartConfig;
export default function MonthlyChange() {
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
          <BarChart accessibilityLayer data={chartData}>
            <defs>
              <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="50%"
                  stopColor="hsl(var(--chart-2))"
                  stopOpacity={1}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--chart-3))"
                  stopOpacity={1}
                />
              </linearGradient>
              <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--chart-3))"
                  stopOpacity={1}
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
              content={<ChartTooltipContent hideLabel hideIndicator />}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <Bar dataKey="visitors" radius={5}>
              <LabelList
                position="top"
                dataKey="visitors"
                fillOpacity={1}
                fill="hsl(var(--primary))"
              />
              {chartData.map((item) => (
                <Cell
                  key={item.month}
                  fill={
                    item.visitors > 0
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
