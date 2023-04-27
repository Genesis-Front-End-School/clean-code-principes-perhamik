import type {GetServerSideProps, GetServerSidePropsContext} from 'next'
import Head from 'next/head'
import {useRouter} from 'next/router'
import React from 'react'
import {Col, Container, Row} from 'react-bootstrap'

import Header from '@/src/components/Header'
import {CourseContextProvider, LessonVideo, LessonsList} from '@/src/components/Lesson'
import LessonInfo from '@/src/components/Lesson/Info'

import {checkLessonsAccess} from '@/src/services'
import type {CourseSingleType} from '@/src/types'

export default function CoursePage() {
	const router = useRouter()
	const [isLoading, setIsLoading] = React.useState(true)
	const [course, setCourse] = React.useState<CourseSingleType>()

	const fetchCourse = async () => {
		try {
			const id = router.query?.id || ''
			if (!id) return

			const response = await fetch(`/api/course/${id}`)
			const data = await response.json()

			if (data.success && data.data) {
				setCourse(() => data.data)
			}
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}

	React.useEffect(() => {
		if (!isLoading) return
		fetchCourse()
	}, [router.query])

	React.useEffect(() => {
		if (!course) return

		const availables = checkLessonsAccess(course.lessons)

		availables.then((status) => {
			const lessons = course.lessons.map((lesson, id) => {
				lesson.available = status.at(id) === 200
				return lesson
			})

			setCourse({...course, lessons})
		})
	}, [course])

	if (isLoading || !course) {
		return <Header />
	}

	return (
		<CourseContextProvider>
			<Head>
				<title>{course.title ? course.title : 'Course'}</title>
				<meta name="description" content={course.description} />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<section className="px-4 py-5">
				<Container className="col-xxl-8">
					<LessonInfo data={course} />
				</Container>
			</section>

			<Container>
				<Row>
					<Col sm={8}>
						<LessonVideo />
					</Col>
					<Col sm={4}>
						<LessonsList />
					</Col>
				</Row>
			</Container>
		</CourseContextProvider>
	)
}
