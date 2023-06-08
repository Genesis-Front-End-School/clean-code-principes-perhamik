'use client'

import React from 'react'

import {Lesson, LessonInfo, LessonVideo, LessonsList} from '@/src/features/Lesson'
import type {CourseSingleType} from '@/src/shared/api'
import {Col, Container, Row} from '@/src/shared/ui'

export const Single = ({course}: {course: CourseSingleType}) => {
	return (
		<Lesson course={course}>
			<section className="px-4 py-5">
				<Container className="col-xxl-8">
					<LessonInfo data={course} />
				</Container>
			</section>

			<Container>
				<Row>
					<Col col-sm={8}>
						<LessonVideo />
					</Col>
					<Col col-sm={4}>
						<LessonsList />
					</Col>
				</Row>
			</Container>
		</Lesson>
	)
}
