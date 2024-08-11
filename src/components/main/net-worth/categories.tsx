"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
const chartData = [
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export default function Categories() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl">Categories</CardTitle>
        <CardDescription className="!mt-0">
          Asset split across the total net worth
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="browser" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
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
