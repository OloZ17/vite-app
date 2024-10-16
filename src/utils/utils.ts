/**
 * A wrapper around the global fetch function that throws an error if the response is not ok.
 *
 * @param url - the URL to fetch
 * @param options - the options to pass to the fetch function
 * @returns a promise that resolves to the result of calling response.json()
 * @throws an error if the response is not ok
 */
async function fetchWrapper(url: string, options?: RequestInit): Promise<any> {
    const response = await fetch(url, options)
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    return response.json()
}
/**
 * Converts a string 'true' or 'false' to a boolean value.
 *
 * @param value - the string to convert
 * @returns the boolean equivalent of the string, or null if not 'true' or 'false'
 */
function stringToBoolean(value: string): boolean | null {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return null;
  }

export { fetchWrapper, stringToBoolean }
