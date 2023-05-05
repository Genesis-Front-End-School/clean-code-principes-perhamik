import {cookies} from 'next/headers'

import API, {checkLessonsAccess} from '@/src/services/api'

import {Single} from './Single'

const fetchCurrentCourse = async (id: string) => {
	const tokenCookie = cookies().get('token')?.value || ''
	const data = await API.getSingleCourseWithToken(tokenCookie, id)
	console.log(data)

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

export default async function CoursePage({params}: {params: {id: string}}) {
	const currentCourse = await fetchCurrentCourse(params.id)
	if (!currentCourse || !currentCourse?.title) {
		return null
	}

	return <Single course={currentCourse} />
}
