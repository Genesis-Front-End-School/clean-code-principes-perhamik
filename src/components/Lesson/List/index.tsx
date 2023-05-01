import React from 'react'
import {ListGroup} from 'react-bootstrap'

import {LessonType} from '@/src/types'
import {transformDuration} from '@/src/utils'

import {CourseContext} from '../context'

export const LessonsList = () => {
	const {videoRef, activeLesson, lessonsList, setLessonsList, currentCourse} = React.useContext(CourseContext)

	const getVideoElement = () => {
		return videoRef?.current
	}

	const onLessonClick = (lesson: LessonType) => {
		const video = getVideoElement()

		if (!video) return

		const event = new CustomEvent('change', {
			detail: {
				lesson: lesson,
			},
		})
		video.dispatchEvent(event)
	}

	React.useEffect(() => {
		if (!currentCourse) return
		const video = getVideoElement()

		setLessonsList(() => currentCourse.lessons)

		if (!video) return
		if (!currentCourse.lessons) return

		const event = new CustomEvent('input', {
			detail: {
				lessonsList: currentCourse.lessons,
			},
		})
		video.dispatchEvent(event)
	}, [currentCourse])

	return (
		<ListGroup>
			{lessonsList &&
				lessonsList.map((lesson, _id) => (
					<ListGroup.Item
						key={lesson.id}
						as="button"
						active={activeLesson?.id === lesson.id}
						action
						onClick={() => onLessonClick(lesson)}
						className={`d-flex justify-content-between align-items-start ${!lesson.available ? 'disabled' : ''}`}
					>
						<h3 className={`h6 ${!lesson.available ? 'text-muted' : ''}`}>{`${lesson.order}. ${lesson.title}`}</h3>
						<span>{transformDuration(lesson.duration)}</span>
					</ListGroup.Item>
				))}
		</ListGroup>
	)
}
