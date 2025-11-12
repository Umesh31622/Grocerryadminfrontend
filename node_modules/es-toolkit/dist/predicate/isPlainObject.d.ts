/**
 * Checks if a given value is a plain object.
 *
 * @param {object} object - The value to check.
 * @returns {boolean} - True if the value is a plain object, otherwise false.
 *
 * @example
 * console.log(isPlainObject({})); // true
 * console.log(isPlainObject([])); // false
 * console.log(isPlainObject(null)); // false
 * console.log(isPlainObject(Object.create(null))); // true
 * console.log(Buffer.from('hello, world')); // false
 */
declare function isPlainObject(object: object): boolean;

export { isPlainObject };
