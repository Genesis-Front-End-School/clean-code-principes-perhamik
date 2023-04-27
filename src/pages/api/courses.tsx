import {NextApiRequest, NextApiResponse} from 'next'

import {API_GET_COURSES, API_PATH} from '@/src/services/const'
import Storage from '@/src/services/store'
import type {CourseType} from '@/src/types'

const API_ENDPOINT = `${API_PATH}/${API_GET_COURSES}`

type CoursesResponseData = {
	courses: Array<CourseType>
}

export async function getCoursesList(req: NextApiRequest, res: NextApiResponse) {
	try {
		const token = req.cookies['token'] ? req.cookies['token'] : Storage.get('token')

		if (!token) {
			res.status(500).json({success: false})
			return
		}

		const response = await fetch(API_ENDPOINT, {headers: {Authorization: `Bearer ${token}`}})
		const data = (await response.json()) as CoursesResponseData

		res.json({success: true, courses: data.courses})
	} catch (error) {
		console.error(error)
		res.status(500).json({success: false})
	}
}

export default getCoursesList
