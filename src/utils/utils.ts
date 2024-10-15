async function fetchWrapper(url: string, options?: RequestInit): Promise<any> {
    const response = await fetch(url, options)
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    return response.json()
}

export { fetchWrapper }
