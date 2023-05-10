import {cookies} from 'next/headers'

import {API} from '@/src/shared/api'
import type {CourseType} from '@/src/shared/api'

const getTokenInHeadersCookies = (): string => cookies().get('token')?.value || ''

export const retrieveCoursesList = async (): Promise<Array<CourseType>> => {
	const tokenCookie = getTokenInHeadersCookies()
	const data = await API.getCoursesWithToken(tokenCookie)
	return data?.courses
}
