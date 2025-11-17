import currency from "currency.js";
import { getMonth } from ".";

/**
 * Calculates the monthly net worth totals based on the provided data.
 * Uses currency.js for precise monetary calculations to avoid floating-point errors.
 *
 * @param data - The collection of net worth assets.
 * @returns An array of objects containing the month and the total net worth for that month.
 */
export function getMonthlyNetWorthTotals(data: NetWorthAssetsCollection[]) {
  const monthlyTotals: { month: string; total: number }[] = [];

  data.forEach((item) => {
    const month = getMonth(item.date);
    let total = currency(0);

    Object.values(item).forEach((value) => {
      if (typeof value === "number") total = total.add(value);
    });

    monthlyTotals.push({ month, total: total.value });
  });

  return monthlyTotals;
}
