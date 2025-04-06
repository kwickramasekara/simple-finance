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
