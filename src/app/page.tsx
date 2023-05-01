import {Metadata} from 'next'

import {CourseList} from '@/src/components/Course'

import API from '@/src/services/api'

export const metadata: Metadata = {
	title: 'Courses',
	description: 'List of online courses',
}

const fetchCourses = async () => {
	const t = new Promise((res) =>
		setTimeout(() => {
			res(true)
		}, 1500),
	)

	await t
	//const data = await API.getCourses()
	// return data.courses
	return [1, 2, 3]
}

export default async function Home() {
	const courses = await fetchCourses()
	return <>{/* <CourseList courses={courses} /> */}</>
}
