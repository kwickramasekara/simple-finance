import type { Transaction } from "plaid";
import currency from "currency.js";

/**
 * Check if transaction is a credit card payment
 * @param transaction transaction object
 * @returns true if transaction is a credit card payment
 */
export const isCCPayment = (transaction: Transaction) => {
  return (
    transaction.category?.[0]?.toLowerCase() === "payment" &&
    transaction.category?.[1]?.toLowerCase() == "credit card"
  );
};

/**
 * Hook for calculating and formatting card summary transactions
 */
export function useCardSummary(transactions: Transaction[]) {
  const totalSum = transactions.reduce((acc, transaction) => {
    return isCCPayment(transaction) ? acc : acc.add(transaction.amount);
  }, currency(0)).value;

  const formattedTotalSum = currency(totalSum).format();

  return {
    formattedTotalSum,
  };
}
