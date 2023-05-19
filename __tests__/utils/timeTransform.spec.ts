import {afterAll, beforeAll, describe, expect, it, vi} from 'vitest'

import {delay, delayedAction} from '@/src/utils'

describe('Async delay function and callback execution', () => {
	const _delay = vi.fn(async (ms: number) => delay(ms))
	const cb = vi.fn()

	beforeAll(async () => {
		expect(_delay).not.toHaveBeenCalled()
		expect(cb).not.toHaveBeenCalled()
	})

	it.concurrent('returns true', async () => {
		expect(await _delay(350)).toStrictEqual(true)
	})

	it.concurrent('resolves after 350 ms', async () => {
		expect(await _delay(350)).toStrictEqual(true)
	})

	it.concurrent('have proper timout', async () => {
		expect(await delayedAction(350, cb)).toStrictEqual(true)
	})

	afterAll(async () => {
		expect(cb).toHaveBeenCalledTimes(1)
		expect(_delay).toHaveBeenCalledTimes(2)
		//vi.useRealTimers()
	})
})
