import dayjs from "dayjs";

/**
 * Replace the day in a date string with a new day.
 * @param dateStr date string in the format "YYYY-MM-DD"
 * @param newDay new day to replace the old day
 * @returns
 */
const replaceDay = (dateStr: string, newDay: number) => {
  const [year, month] = dateStr.split("-");
  return `${year}-${month}-${String(newDay).padStart(2, "0")}`;
};

/**
 * Get the date period for a given billing date.
 * @param billingDate The billing date
 * @returns The start and end dates of the statement
 */
export const getBillingDates = (billingDate: number) => {
  const dateToday = dayjs().get("date");
  const today = dayjs().format("YYYY-MM-DD");
  let endDate = replaceDay(today, billingDate);

  if (dateToday <= billingDate) {
    const previousMonth = dayjs().subtract(1, "month").format("YYYY-MM-DD");
    endDate = replaceDay(previousMonth, billingDate);
  }

  return {
    startDate: dayjs(endDate).subtract(1, "month").format("YYYY-MM-DD"),
    endDate,
  };
};

/**
 * Sorts two objects by their date property in descending order.
 *
 * @param a - The first object containing a date property as a string.
 * @param b - The second object containing a date property as a string.
 * @returns A negative number if `b` is before `a`, a positive number if `b` is after `a`, or 0 if they are equal.
 */
export const sortByDate = (a: { date: string }, b: { date: string }) =>
  b.date.localeCompare(a.date);

/**
 * Returns the month name for a given date.
 * @param date - The date in string format.
 * @param short - Optional parameter to return the short form of the month name.
 * @returns The month name as a string.
 */
export function getMonth(date: string, short = false): string {
  return new Date(date).toLocaleString("default", {
    month: short ? "short" : "long",
  });
}

/**
 * Returns the ordinal suffix for a given day of the month.
 *
 * @param day - The day of the month (1-31).
 * @returns The ordinal suffix ("st", "nd", "rd", "th") for the given day.
 */
export function getOrdinalSuffix(day: number): string {
  if (day >= 11 && day <= 13) return "th";

  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
