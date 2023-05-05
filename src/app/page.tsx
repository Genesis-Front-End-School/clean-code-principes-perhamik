import {Metadata} from 'next'
import {cookies} from 'next/headers'

import {CourseList} from '@/src/components/Course'

import API from '@/src/services/api'

export const metadata: Metadata = {
	title: 'Courses',
	description: 'List of online courses',
}

const fetchCourses = async () => {
	const tokenCookie = cookies().get('token')?.value || ''
	const data = await API.getCoursesWithToken(tokenCookie)
	return data?.courses
}

export default async function Home() {
	const courses = await fetchCourses()
	if (!courses) return null

	return (
		<>
			<CourseList courses={courses} />
		</>
	)
}
