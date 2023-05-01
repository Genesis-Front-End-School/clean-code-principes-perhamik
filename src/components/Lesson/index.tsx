import {CourseContextProvider} from './context'

export {CourseContextProvider, CourseContext} from './context'
export {LessonInfo} from './Info'
export {LessonVideo} from './Video'
export {LessonsList} from './List'

export const Lesson = ({children}: {children: React.ReactNode}) => {
	return <CourseContextProvider>{children}</CourseContextProvider>
}
