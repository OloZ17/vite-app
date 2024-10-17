import { useState } from 'react'

/**
 * @param {string} keyName The key of the item in local storage
 * @param {T} defaultValue The default value if the key does not exist
 * @returns {[T, (newValue: T) => void]} An array, with the first element being the current value and the second element being a function to set a new value
 */
export function useLocalStorage<T>(
    keyName: string,
    defaultValue: T
): [T, (newValue: T) => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const value = window.localStorage.getItem(keyName)
            if (value) {
                return JSON.parse(value) as T
            } else {
                window.localStorage.setItem(
                    keyName,
                    JSON.stringify(defaultValue)
                )
                return defaultValue
            }
        } catch (err) {
            return defaultValue
        }
    })
    const setValue = (newValue: T) => {
        try {
            window.localStorage.setItem(keyName, JSON.stringify(newValue))
        } catch (err) {
            console.log(err)
        }
        setStoredValue(newValue)
    }
    return [storedValue, setValue] as const
}
