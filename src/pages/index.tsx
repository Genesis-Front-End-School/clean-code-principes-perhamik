import Head from 'next/head'
import React from 'react'

import {CourseList} from '@/src/components/Course'
import Header from '@/src/components/Header'

import {CourseType} from '@/src/types'

export default function Home() {
	const [isLoading, setIsLoading] = React.useState(true)
	const [courses, setCourses] = React.useState<Array<CourseType>>([])

	const fetchCourses = async () => {
		try {
			const response = await fetch('/api/courses')
			const data = await response.json()

			if (data.success && data.courses) {
				setCourses(() => data.courses)
			}
		} catch (error) {
			console.error(error)
		}

		setIsLoading(false)
	}

	React.useEffect(() => {
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
