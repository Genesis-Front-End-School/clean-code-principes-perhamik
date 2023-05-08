import {beforeAll, describe, expect, it, vi} from 'vitest'

import {authResponse, course, courses} from './apiData'

global.fetch = vi.fn()

vi.mock('Storage', () => {
	const Storage = vi.fn()
	Storage.prototype.getInstance = vi.fn()
	Storage.prototype.get = vi.fn()
	Storage.prototype.set = vi.fn()

	return {Storage}
})

vi.mock('API', () => {
	const API = vi.fn()
	API.prototype.getInstance = vi.fn()
	API.prototype.authenticationRequest = vi.fn()
	API.prototype.getCoursesRequest = vi.fn()
	API.prototype.getToken = vi.fn()
	API.prototype.setToken = vi.fn()
	API.prototype.authenticateGuestUser = vi.fn(() => {
		return {
			json: () => new Promise((resolve) => resolve(authResponse)),
		}
	})
	API.prototype.getCoursesWithToken = vi.fn(() => {
		return {
			json: () => new Promise((resolve) => resolve(courses)),
		}
	})
	API.prototype.getSingleCourseWithToken = vi.fn(() => {
		return {
			json: () => new Promise((resolve) => resolve(course)),
		}
	})
	API.prototype.getCoursesRequest = vi.fn()

	return API
})

describe('API', () => {
	beforeAll(() => {
		vi.spyOn(window, 'fetch')
	})

	it('Auth', async () => {
		const authAsGuest = vi.fn().mockImplementation(() => authResponse)

		const token = await authAsGuest()

		expect(token).toStrictEqual(authResponse)
	})

	it('Get Courses', async () => {
		const getCourses = vi.fn().mockImplementation(() => courses)

		const list = await getCourses()

		expect(list).toStrictEqual(courses)
	})
})
