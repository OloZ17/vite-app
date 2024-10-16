import { describe, it, expect, vi } from 'vitest'
import { fetchWrapper, stringToBoolean } from './utils'

describe('fetchWrapper', () => {
    it('returns JSON response on successful fetch with default options', async () => {
        const url = 'https://example.com/api/data'
        const response = { ok: true, json: () => ({ data: 'example' }) }
        vi.stubGlobal('fetch', () => Promise.resolve(response))
        const result = await fetchWrapper(url)
        expect(result).toEqual({ data: 'example' })
    })

    it('returns JSON response on successful fetch with custom options', async () => {
        const url = 'https://example.com/api/data'
        const options = { method: 'POST', body: JSON.stringify({ foo: 'bar' }) }
        const response = { ok: true, json: () => ({ data: 'example' }) }
        vi.stubGlobal('fetch', () => Promise.resolve(response))
        const result = await fetchWrapper(url, options)
        expect(result).toEqual({ data: 'example' })
    })

    it('throws error on failed fetch with error status', async () => {
        const url = 'https://example.com/api/data'
        const response = { ok: false, statusText: 'Not Found' }
        vi.stubGlobal('fetch', () => Promise.resolve(response))
        await expect(fetchWrapper(url)).rejects.toThrowError('Not Found')
    })

    it('throws error on failed fetch with non-JSON response', async () => {
        const url = 'https://example.com/api/data'
        const response = {
            ok: true,
            json: () => {
                throw new Error('Invalid JSON')
            },
        }
        vi.stubGlobal('fetch', () => Promise.resolve(response))
        await expect(fetchWrapper(url)).rejects.toThrowError('Invalid JSON')
    })
})
describe('stringToBoolean', () => {
    it('converts "true" to true', () => {
        expect(stringToBoolean('true')).toBe(true)
    })

    it('converts "false" to false', () => {
        expect(stringToBoolean('false')).toBe(false)
    })

    it('returns null for other strings', () => {
        expect(stringToBoolean('hello')).toBeNull()
        expect(stringToBoolean('123')).toBeNull()
        expect(stringToBoolean('')).toBeNull()
    })
})
