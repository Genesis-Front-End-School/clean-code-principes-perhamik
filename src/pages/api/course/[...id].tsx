import {NextApiRequest, NextApiResponse} from 'next'

import {API_GET_COURSES, API_PATH} from '@/src/services/const'
import Storage from '@/src/services/store'
import type {CourseSingleType, CourseType} from '@/src/types'

const API_ENDPOINT = `${API_PATH}/${API_GET_COURSES}`

export async function getCourseSingle(req: NextApiRequest, res: NextApiResponse) {
	const id = req.query?.id || ''
	try {
		const token = req.cookies['token'] ? req.cookies['token'] : Storage.get('token')

		if (!token) {
			res.status(500).json({success: false})
			return
		}

		const response = await fetch(`${API_ENDPOINT}/${id}`, {headers: {Authorization: `Bearer ${token}`}})
		const data = (await response.json()) as CourseSingleType

		res.json({success: true, data: data})
	} catch (error) {
		console.error(error)
		res.status(500).json({success: false})
	}
}

export default getCourseSingle
