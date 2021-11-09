/**
 * Fetches unique values from an array.
 * @param {T} value
 * @param {number} index
 * @param {Array<T>} self
 * @returns {boolean}
 */
export function getArrayUniqueValues<T>(value: T, index: number, self: Array<T>): boolean {
	return self.indexOf(value) === index;
}

/**
 * Makes some query params for the given data.
 * @param {{[p: string]: string | number}} params
 * @returns {string}
 */
export function makeQueryParams(params: { [key: string]: string | number }): string {
	return '?' + Object.entries(params)
		.map(item => {
			const [key, val] = item;

			return `${ key }=${ val }`;
		}).join('&');
}

/**
 * Makes the route with its query params.
 * @param {string} url
 * @param {{[p: string]: string | number}} params
 * @returns {string}
 */
export function getRouteWithQueryParams(url: string, params: { [key: string]: string | number }): string {
	return `${ url }${ makeQueryParams(params) }`;
}