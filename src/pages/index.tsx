import Head from 'next/head'
import React from 'react'

import {CourseList} from '@/src/components/Course'
import Header from '@/src/components/Header'

import API from '@/src/services/api'
import {CourseType} from '@/src/types'

export default function Home() {
	const [isLoading, setIsLoading] = React.useState(true)
	const [courses, setCourses] = React.useState<Array<CourseType>>([])

	React.useEffect(() => {
		const fetchCourses = async () => {
			const data = await API.getCourses()
			if (data.courses) {
				setCourses(() => data.courses)
			}

			setIsLoading(false)
		}

		if (!isLoading) return
		fetchCourses()
	}, [])

	return (
		<>
			<Head>
				<title>Courses</title>
				<meta name="description" content="List of online courses" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<CourseList courses={courses} />
		</>
	)
}
