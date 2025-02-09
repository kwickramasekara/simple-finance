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
  
