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
