import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { cn, formatCurrency } from "@/lib/utils";

export function SavingProgress({
  id,
  label,
  valCurrent,
  valGoal,
}: {
  id: string;
  label: string;
  valCurrent: number;
  valGoal: number;
}) {
  const percentage = (valCurrent / valGoal) * 100;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Label htmlFor={id}>{label}</Label>
        <span>&#183;</span>
        <span className="text-sm font-mono font-medium">
          {formatCurrency(valCurrent, true, true)}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Progress
          id={id}
          indicatorColor={cn({
            "bg-yellow-500": percentage <= 75,
            "bg-green-500": percentage > 75,
          })}
          value={percentage}
        />
        <span className="text-muted-foreground text-sm font-mono font-semibold">
          {formatCurrency(valGoal, true, true)}
        </span>
      </div>
    </div>
  );
}
