/**
 * Fetches unique values from an array.
 * @param {T} value
 * @param {number} index
 * @param {Array<T>} self
 * @returns {boolean}
 */
export function getArrayUniqueValues<T>(value: T, index: number, self: Array<T>) {
	return self.indexOf(value) === index;
}