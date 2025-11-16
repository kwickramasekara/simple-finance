import { Models } from "node-appwrite";

/**
 * Appwrite databases often return metadata fields prefixed with `$` which leads to
 * issues with react iteration and rendering. This function cleans the metadata by
 * removing any keys that start with `$`.
 * @param arr Array of objects to be cleaned
 * @returns
 */
export const cleanDBMetadata = (arr: Object[]) => {
  return arr.map((obj) =>
    Object.fromEntries(
      Object.entries(obj).filter(([key]) => !key.startsWith("$"))
    )
  );
};

/**
 * Removes database metadata properties from an object.
 *
 * @param obj - The object from which to remove the metadata properties.
 * @returns A new object without the database metadata properties.
 */
export const stripDbMetadata = (obj: Object) => {
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
};

/**
 * Removes common null keys from an array of objects.
 * If any key is not null in any object, it is not removed.
 *
 * @param data - The array of objects to remove common null keys from.
 * @returns The array of objects with common null keys removed.
 */
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

/**
 * Validates if the given string is a valid asset value.
 * @param str string to be validated
 * @returns
 */
export const validAssetVal = (str: string | null | undefined): boolean => {
  if (
    str === null ||
    str === undefined ||
    str.trim() === "" ||
    str.trim() === "0" ||
    parseFloat(str) < 0
  ) {
    return false;
  }

  return true;
};

/**
 * Extracts unique years from an array of documents with date properties.
 * Returns years sorted in descending order (newest first).
 *
 * @param documents - Array of documents containing date properties.
 * @returns Array of year strings sorted in descending order.
 */
export function extractYearsFromDocuments(
  documents: Models.Document[]
): string[] {
  const years = new Set<string>();

  documents.forEach((doc) => {
    const date = new Date(doc.date);
    years.add(date.getFullYear().toString());
  });

  return Array.from(years).sort((a, b) => parseInt(b) - parseInt(a));
}

/**
 * Returns the error message from an error object or Appwrite response object.
 *
 * @param error - The error object to extract the message from.
 * @returns The error message as a APIResponse object.
 */
export function handleError(error: any): APIResponse {
  if ((error as Error).message) {
    return {
      error: (error as Error).message,
    };
  } else {
    return {
      error: JSON.stringify((error as any)?.response?.message),
    };
  }
}
