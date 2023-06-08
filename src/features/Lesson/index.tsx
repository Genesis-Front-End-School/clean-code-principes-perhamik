import {useContext, useEffect} from 'react'
import type {ReactNode} from 'react'

import type {CourseSingleType} from '@/src/shared/api'

import {CourseContext, CourseContextProvider} from './context'

export {CourseContextProvider, CourseContext} from './context'
export {LessonInfo} from './Info'
export {LessonVideo} from './Video'
export {LessonsList} from './List'

const LessonWithContext = ({children, course}: {children: ReactNode; course: CourseSingleType}) => {
	const {setCurrentCourse} = useContext(CourseContext)
	useEffect(() => {
		setCurrentCourse && setCurrentCourse(() => course)
	}, [course])
	return <>{children}</>
}

export const Lesson = ({children, course}: {children: React.ReactNode; course: CourseSingleType}) => {
	return (
		<CourseContextProvider>
			<LessonWithContext course={course}>{children}</LessonWithContext>
		</CourseContextProvider>
	)
}
