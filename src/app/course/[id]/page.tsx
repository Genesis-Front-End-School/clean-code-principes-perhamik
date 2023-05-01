import React from 'react'
import {Col, Container, Row} from 'react-bootstrap'

import {Lesson, LessonInfo, LessonVideo, LessonsList} from '@/src/components/Lesson'

import {checkLessonsAccess} from '@/src/services'
import API from '@/src/services/api'

const fetchCurrentCourse = async (id: string) => {
	try {
		const data = await API.getSingleCourse(id)
		const availables = await checkLessonsAccess(data.lessons)
		return {
			...data,
			lessons: data.lessons.map((lesson, id) => {
				lesson.available = availables.at(id) === 200
				return lesson
			}),
		}
	} catch (error) {
		console.error(error)
		return null
	}
}

export default async function CoursePage({params}: {params: {id: string}}) {
	const currentCourse = await fetchCurrentCourse(params.id)
	if (!currentCourse) {
		return null
	}

	return (
		<Lesson>
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
		</Lesson>
	)
}
