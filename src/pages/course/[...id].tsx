import Head from 'next/head'
import {useRouter} from 'next/router'
import React from 'react'
import {Col, Container, Row} from 'react-bootstrap'

import Header from '@/src/components/Header'
import Lesson, {CourseContext, LessonVideo, LessonsList} from '@/src/components/Lesson'
import LessonInfo from '@/src/components/Lesson/Info'

import {checkLessonsAccess} from '@/src/services'
import API from '@/src/services/api'

export default function CoursePage() {
	return (
		<Lesson>
			<CoursePageLayout />
		</Lesson>
	)
}

function CoursePageLayout() {
	const router = useRouter()
	const [isLoading, setIsLoading] = React.useState(true)
	const {currentCourse, setCurrentCourse} = React.useContext(CourseContext)

	React.useEffect(() => {
		const fetchCurrentCourse = async (id: string) => {
			try {
				const data = await API.getSingleCourse(id)
				const availables = await checkLessonsAccess(data.lessons)
				setCurrentCourse(() => {
					return {
						...data,
						lessons: data.lessons.map((lesson, id) => {
							lesson.available = availables.at(id) === 200
							return lesson
						}),
					}
				})
			} catch (error) {
				console.error(error)
			}

			setIsLoading(false)
		}

		const id = router.query && router.query.id ? `${router.query.id}` : ''
		if (!isLoading || !id) return
		fetchCurrentCourse(id)
	}, [router.query])

	if (!currentCourse) {
		return <Header />
	}

	return (
		<>
			<Head>
				<title>{currentCourse.title ? currentCourse.title : 'Course'}</title>
				<meta name="description" content={currentCourse.description} />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<section className="px-4 py-5">
				<Container className="col-xxl-8">
					<LessonInfo data={currentCourse} />
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
		</>
	)
}
