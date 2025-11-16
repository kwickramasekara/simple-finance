import type { Transaction } from "plaid";
import { useCardSummary } from "@/hooks/expenses/useCardSummary";

export default function CardSummary({
  headerText,
  transactions,
}: {
  headerText: string;
  transactions: Transaction[];
}) {
  const { formattedTotalSum } = useCardSummary(transactions);

  return (
    <p className="grid gap-2 mx-4 my-4 font-medium text-center">
      <span>{headerText}</span>
      <span className="text-muted-foreground font-mono">
        {formattedTotalSum}
      </span>
    </p>
  );
}
