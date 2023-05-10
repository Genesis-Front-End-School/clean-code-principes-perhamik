import {CourseContextProvider} from './context'

export {CourseContextProvider, CourseContext} from './context'
export {LessonVideo} from './Video'
export {LessonsList} from './List'

export default function Lesson({children}: {children: React.ReactNode}) {
	return <CourseContextProvider>{children}</CourseContextProvider>
}
