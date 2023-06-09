import {ListGroup} from '@perhamik/react-components'
import {useContext, useEffect} from 'react'

import {CourseContext} from '../context'
import {LessonListItem} from './Item'

export const LessonsList = () => {
	const {lessonsList, setLessonsList, currentCourse} = useContext(CourseContext)

	useEffect(() => {
		if (!currentCourse || !currentCourse.lessons) return
		setLessonsList(() => currentCourse.lessons)
	}, [currentCourse])

	return (
		<ListGroup>
			{lessonsList && lessonsList.map((lesson) => <LessonListItem key={lesson.id} lesson={lesson} />)}
		</ListGroup>
	)
}
