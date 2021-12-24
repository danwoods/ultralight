/** @file Utilities for JavaScript arrays */

/**
 * Sort an array of objects by a property
 * @param a One of the array items to compare
 * @param b One of the array items to compare
 * @param key Array item property to compare
 * @returns {number} -1 if a < b, 0 if a = b, 1 if a > b
 */
export const sortBy = <T extends Object>(a: T, b: T, key: keyof T) => {
  if (a[key] < b[key]) {
    return -1
  }
  if (a[key] > b[key]) {
    return 1
  }
  return 0
}
