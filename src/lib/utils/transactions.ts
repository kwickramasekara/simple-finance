import { Transaction } from "plaid";

/**
 * Check if transaction is a credit card payment
 * @param transaction transaction object
 * @returns true if transaction is a credit card payment
 */
const isCCPayment = (transaction: Transaction) => {
  return (
    transaction.category?.[0]?.toLowerCase() === "payment" &&
    transaction.category?.[1]?.toLowerCase() == "credit card"
  );
};

/**
 * Get the total sum of transactions
 * @param transactions array of transaction objects
 * @returns total sum of transactions
 */
export const getTotal = (transactions: Transaction[]) => {
  return transactions.reduce((acc, transaction) => {
    if (isCCPayment(transaction)) {
      console.log(transaction);
    }
    return isCCPayment(transaction) ? acc : acc + transaction.amount;
  }, 0);
};
