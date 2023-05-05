import Storage from '@/src/services/store'
import {CourseSingleType, CourseType, LessonType} from '@/src/types'

import {API_AUTH_PATH, API_GET_COURSES, API_PATH} from './const'

export type AuthResponseData = {
	token: string
}

type CoursesResponseData = {
	courses: Array<CourseType>
}

export class API {
	private static instance: API
	private constructor() {}

	public static getInstance(): API {
		if (!API.instance) {
			API.instance = new API()
		}

		return API.instance
	}

	private authenticationRequest() {
		return fetch(`${API_PATH}/${API_AUTH_PATH}`, {next: {revalidate: 60}})
	}

	private getCoursesRequest(token: string, id: string = '') {
		return fetch(`${API_PATH}/${API_GET_COURSES}${id ? '/' + id : ''}`, {
			headers: {Authorization: `Bearer ${token}`},
			cache: 'force-cache',
		})
	}

	public getToken() {
		return Storage.get('token') || ''
	}

	public setToken(token: string) {
		return Storage.set('token', token)
	}

	public async authenticateGuestUser() {
		const authRequest = await API.instance.authenticationRequest()
		const tokenData = (await authRequest.json()) as AuthResponseData
		return tokenData.token
	}

	public async getCoursesWithToken(token: string) {
		try {
			const courseRequest = await API.instance.getCoursesRequest(token)
			const courseData = (await courseRequest.json()) as CoursesResponseData
			return courseData
		} catch (err) {
			console.warn(err)
			return {
				courses: [],
			} as CoursesResponseData
		}
	}

	public async getSingleCourseWithToken(token: string, id: string) {
		try {
			const courseRequest = await API.instance.getCoursesRequest(token, id)
			const courseData = (await courseRequest.json()) as CourseSingleType
			return courseData
		} catch (err) {
			console.warn(err)
			return {} as CourseSingleType
		}
	}
}

export default API.getInstance()

export const checkLessonsAccess = async (list: Array<LessonType>) => {
	const result: Array<number> = []
	if (!list) return result
	for await (let lesson of list) {
		try {
			const res = await fetch(lesson.link)
			result.push(res.status)
		} catch (err) {
			console.warn(err)
		}
	}

	return result
}
