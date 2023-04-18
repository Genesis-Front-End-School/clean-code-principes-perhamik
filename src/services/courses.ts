import type {GetServerSidePropsContext} from 'next/types'

import {requestToken} from './auth'
import type {CourseType} from '@/src/types'

export const requestCoursesList = (token: string) => {
	return fetch(`${process.env.API_URL}/${process.env.API_VERSION}/core/preview-courses`, {
		headers: {Authorization: `Bearer ${token}`},
	})
}

export const getCoursesList = async (ctx: GetServerSidePropsContext) => {
	const token = await requestToken(ctx)
	const req = await requestCoursesList(token)
	const data = await req.json()
	return data as {courses: Array<CourseType>}
}
