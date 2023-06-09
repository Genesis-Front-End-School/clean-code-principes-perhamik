import {createContext, useMemo, useRef, useState} from 'react'
import type {Dispatch, MutableRefObject, ReactNode, SetStateAction} from 'react'

import type {CourseSingleType, LessonType} from '@/src/shared/api'

type ContextType = {
	videoRef: MutableRefObject<HTMLVideoElement | null>
	activeLesson: LessonType | null
	setActiveLesson: Dispatch<SetStateAction<LessonType | null>>
	lessonsList: Array<LessonType> | null
	setLessonsList: Dispatch<SetStateAction<Array<LessonType> | null>>
	currentCourse: CourseSingleType | null
	setCurrentCourse: Dispatch<SetStateAction<CourseSingleType | null>>
	setActiveLessonById: Function
}

export const CourseContext = createContext<ContextType>({} as ContextType)

export const CourseContextProvider = ({children}: {children: ReactNode}) => {
	const videoRef = useRef<HTMLVideoElement | null>(null)

	const [lessonsList, setLessonsList] = useState<Array<LessonType> | null>(null)
	const [activeLesson, setActiveLesson] = useState<LessonType | null>(null)
	const [currentCourse, setCurrentCourse] = useState<CourseSingleType | null>(null)

	const setActiveLessonById = (id: string) => {
		if (!lessonsList || !id) return
		const search = lessonsList.find((lesson) => lesson.id === id)
		search && setActiveLesson(search)
	}

	const contextData = useMemo(
		() => ({
			videoRef,
			lessonsList,
			setLessonsList,
			activeLesson,
			setActiveLesson,
			currentCourse,
			setCurrentCourse,
			setActiveLessonById,
		}),
		[videoRef, lessonsList, setLessonsList, activeLesson, setActiveLesson, currentCourse, setCurrentCourse],
	)

	return <CourseContext.Provider value={contextData}>{children}</CourseContext.Provider>
}
