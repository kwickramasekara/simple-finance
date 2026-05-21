import currency from "currency.js";

/**
 * Formats a number as a currency string using currency.js.
 *
 * @param value - The number to format as currency.
 * @param round - Whether to round the number or not. Default is true.
 * @param scale - Whether to scale the number for thousands and millions. Default is false.
 * @returns The formatted currency string.
 */
export function formatCurrency(
  value: number,
  round = true,
  scale = false,
): string {
  // Determine the sign of the value (-1 for negative, 1 for positive, 0 for zero)
  const sign = Math.sign(value);

  // Use the absolute value for scaling decisions
  const absValue = Math.abs(value);

  const valueToFormat =
    scale && absValue >= 1000000
      ? absValue / 1000000
      : scale && absValue > 1000
        ? absValue / 1000
        : absValue;

  // Use currency.js for formatting
  const isMillion = scale && absValue >= 1000000;
  const precision = round ? (isMillion ? 2 : 0) : 2;
  let formattedString = currency(valueToFormat, {
    symbol: "$",
    precision,
  }).format();

  // Preserve the sign in the output
  const signPrefix = sign === -1 ? "-" : "";

  if (scale && isMillion) {
    // Strip trailing zeros and decimal point if no decimals remain
    formattedString = formattedString.replace(/\.?0+$/, "");
    return `${signPrefix}${formattedString}M`;
  }
  if (scale && absValue > 1000) {
    return `${signPrefix}${formattedString}K`;
  }
  return `${signPrefix}${formattedString}`;
}
