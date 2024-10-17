import { renderHook, act, RenderHookResult } from '@testing-library/react'
import { useLocalStorage } from '../useLocalStorage'
import { describe, it, expect, beforeEach, vi } from 'vitest'

describe('useLocalStorage', () => {
    beforeEach(() => {
        window.localStorage.clear()
    })

    it('returns default value when key does not exist in local storage', () => {
        const {
            result,
        }: RenderHookResult<[string, (newValue: string) => void], unknown> =
            renderHook(() =>
                useLocalStorage<string>('test-key', 'default-value')
            )
        expect(result.current[0]).toBe('default-value')
    })

    it('retrieves value from local storage when key exists', () => {
        window.localStorage.setItem('test-key', JSON.stringify('stored-value'))
        const {
            result,
        }: RenderHookResult<[string, (newValue: string) => void], unknown> =
            renderHook(() =>
                useLocalStorage<string>('test-key', 'default-value')
            )
        expect(result.current[0]).toBe('stored-value')
    })

    it('sets a new value in local storage and updates state', () => {
        const {
            result,
        }: RenderHookResult<[string, (newValue: string) => void], unknown> =
            renderHook(() =>
                useLocalStorage<string>('test-key', 'default-value')
            )
        act(() => {
            result.current[1]('new-value')
        })
        expect(window.localStorage.getItem('test-key')).toBe(
            JSON.stringify('new-value')
        )
        expect(result.current[0]).toBe('new-value')
    })

    it.skip('handles errors when setting a new value', () => {
        const consoleErrorSpy = vi.spyOn(console, 'error')
        const {
            result,
        }: RenderHookResult<[string, (newValue: string) => void], unknown> =
            renderHook(() =>
                useLocalStorage<string>('test-key', 'default-value')
            )
        act(() => {
            result.current[1]('new-value')
        })
        // Simulate an error
        window.localStorage.setItem = vi.fn(() => {
            throw new Error('Mock error')
        })
        act(() => {
            result.current[1]('another-value')
        })
        expect(consoleErrorSpy).toHaveBeenCalled()
        //expect(consoleErrorSpy).toThrowError('Mock error')
        expect(result.current[0]).toBe('new-value')
        consoleErrorSpy.mockRestore()
    })

    it('handles multiple calls with different keys', () => {
        const {
            result: result1,
        }: RenderHookResult<[string, (newValue: string) => void], unknown> =
            renderHook(() => useLocalStorage<string>('key1', 'value1'))
        const {
            result: result2,
        }: RenderHookResult<[string, (newValue: string) => void], unknown> =
            renderHook(() => useLocalStorage<string>('key2', 'value2'))

        expect(result1.current[0]).toBe('value1')
        expect(result2.current[0]).toBe('value2')
        act(() => {
            result1.current[1]('new-value1')
        })
        act(() => {
            result2.current[1]('new-value2')
        })
        expect(window.localStorage.getItem('key1')).toBe(
            JSON.stringify('new-value1')
        )
        expect(window.localStorage.getItem('key2')).toBe(
            JSON.stringify('new-value2')
        )
    })
})
