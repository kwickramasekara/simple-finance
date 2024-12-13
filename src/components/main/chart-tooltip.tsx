import { formatCurrency } from "@/lib/utils";
import { ChartConfig } from "@/components/ui/chart";

// To be used with the ChartTooltipContent component "formatter" prop
export function chartToolTipCurrency(
  value: number,
  name: string,
  chartConfig: ChartConfig
) {
  return (
    <>
      <div className="text-muted-foreground">
        {chartConfig[name as keyof typeof chartConfig]?.label || name}
      </div>
      <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
        {formatCurrency(value as number, true, true)}
      </div>
    </>
  );
}
