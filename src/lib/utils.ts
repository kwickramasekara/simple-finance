import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMonth(date: string, short = false) {
  const month = new Date(date).toLocaleString("default", { month: "long" });

  return short ? month.slice(0, 3) : month;
}

export function formatCurrency(value: number) {
  const roundedValue = Math.round(value);

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(roundedValue);
}

export function stripDbMetadata(obj: Object) {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([key]) =>
        ![
          "$collectionId",
          "$databaseId",
          "$permissions",
          "$createdAt",
          "$updatedAt",
        ].includes(key)
    )
  );
}

export function removeCommonNulls(data: any[]): any[] {
  if (data.length === 0) return data;

  // Step 1: Identify keys that are null in all objects
  const commonNullKeys = new Set<string>();

  // Initialize commonNullKeys with keys from the first object
  Object.keys(data[0]).forEach((key) => {
    if (data[0][key] === null) {
      commonNullKeys.add(key);
    }
  });

  // Check other objects
  for (let i = 1; i < data.length; i++) {
    for (const key of commonNullKeys) {
      if (data[i][key] !== null) {
        commonNullKeys.delete(key);
      }
    }
  }

  // Step 2: Remove common null keys from each object
  return data.map((obj) => {
    const newObj = { ...obj };
    for (const key of commonNullKeys) {
      delete newObj[key];
    }
    return newObj;
  });
}

export function getMonthlyNetWorthTotals(data: NetWorthAssetsCollection[]) {
  const monthlyTotals: { month: string; total: number }[] = [];

  data.forEach((item) => {
    const month = getMonth(item.date);
    let total = 0;

    Object.values(item).forEach((value) => {
      if (typeof value === "number") total += value;
    });

    monthlyTotals.push({ month, total });
  });

  return monthlyTotals;
}
