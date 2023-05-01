import Storage from '@/src/services/store'
import {CourseSingleType, CourseType, LessonType} from '@/src/types'

import {API_AUTH_PATH, API_GET_COURSES, API_PATH, PUB_API_PATH} from './const'

type AuthResponseData = {
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
		return fetch(`${PUB_API_PATH}/${API_AUTH_PATH}`, {})
	}

	private getCoursesRequest(token: string, id: string = '') {
		return fetch(`${API_PATH}/${API_GET_COURSES}/${id}`, {
			headers: {Authorization: `Bearer ${token}`},
		})
	}

	private getToken() {
		return Storage.get('token') || ''
	}

	public async authenticateAsGuest() {
		const authRequest = await this.authenticationRequest()
		const tokenData = (await authRequest.json()) as AuthResponseData

		if (tokenData.token) {
			Storage.set('token', tokenData.token)
		}
	}

	public async getCourses() {
		const token = this.getToken()
		const courseRequest = await this.getCoursesRequest(token)
		const courseData = (await courseRequest.json()) as CoursesResponseData
		return courseData
	}

	public async getSingleCourse(id: string) {
		const token = this.getToken()
		const courseRequest = await this.getCoursesRequest(token, id)
		const courseData = (await courseRequest.json()) as CourseSingleType
		return courseData
	}
}

export default API.getInstance()

export const checkLessonsAccess = async (list: Array<LessonType>) => {
	const result: Array<number> = []
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
