import React from 'react'

import type {CourseSingleType, LessonType} from '@/src/shared/api'
import {env} from '@/src/shared/config'

type ContextType = {
	videoRef: React.MutableRefObject<HTMLVideoElement | null>
	offsetTime: number
	setOffsetTime: React.Dispatch<React.SetStateAction<number>>
	activeLesson: LessonType | null
	setActiveLesson: React.Dispatch<React.SetStateAction<LessonType | null>>
	lessonsList: Array<LessonType> | null
	setLessonsList: React.Dispatch<React.SetStateAction<Array<LessonType> | null>>
	currentCourse: CourseSingleType | null
	setCurrentCourse: React.Dispatch<React.SetStateAction<CourseSingleType | null>>
}

export const CourseContext = React.createContext<ContextType>({} as ContextType)

export const CourseContextProvider = ({children}: {children: React.ReactNode}) => {
	const videoRef = React.useRef<HTMLVideoElement | null>(null)
	const [offsetTime, setOffsetTime] = React.useState<number>(env.PLAYER_START_POSITION)

	const [lessonsList, setLessonsList] = React.useState<Array<LessonType> | null>(null)
	const [activeLesson, setActiveLesson] = React.useState<LessonType | null>(null)
	const [currentCourse, setCurrentCourse] = React.useState<CourseSingleType | null>(null)

	const contextData = React.useMemo(
		() => ({
			videoRef,
			offsetTime,
			setOffsetTime,
			lessonsList,
			setLessonsList,
			activeLesson,
			setActiveLesson,
			currentCourse,
			setCurrentCourse,
		}),
		[
			videoRef,
			offsetTime,
			setOffsetTime,
			lessonsList,
			setLessonsList,
			activeLesson,
			setActiveLesson,
			currentCourse,
			setCurrentCourse,
		],
	)

	return <CourseContext.Provider value={contextData}>{children}</CourseContext.Provider>
}
