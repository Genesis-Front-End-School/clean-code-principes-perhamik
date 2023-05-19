import {Metadata} from 'next'
import {cookies} from 'next/headers'

import API, {checkLessonsAccess} from '@/src/services/api'
import {CourseSingleType} from '@/src/types'

import {Single} from './Single'

const fetchCurrentCourse = async (id: string): Promise<CourseSingleType> => {
	const tokenCookie = cookies().get('token')?.value || ''
	const data = await API.getSingleCourseWithToken(tokenCookie, id)

	if (!data?.lessons) return data
	const availables = await checkLessonsAccess(data.lessons)
	return {
		...data,
		lessons: data.lessons.map((lesson, id) => {
			lesson.available = availables.at(id) === 200
			return lesson
		}),
	}
}

export const metadata: Metadata = {
	title: 'Course',
}

export default async function CoursePage({params}: {params: {id: string}}) {
	const currentCourse = await fetchCurrentCourse(params.id)
	if (!currentCourse || !currentCourse?.title) {
		return null
	}

	Object.assign(metadata, {title: currentCourse.title, description: currentCourse.description})

	return <Single course={currentCourse} />
}
