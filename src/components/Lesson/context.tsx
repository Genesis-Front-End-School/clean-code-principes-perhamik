import React from 'react'

import {PLAYER_START_POSITION} from '@/src/services/const'
import {CourseSingleType, LessonType} from '@/src/types'

type ContextType = {
	videoRef: React.MutableRefObject<HTMLVideoElement>
	offsetTime: number
	setOffsetTime: React.Dispatch<React.SetStateAction<number>>
	activeLesson: LessonType
	setActiveLesson: React.Dispatch<React.SetStateAction<LessonType>>
	lessonsList: Array<LessonType>
	setLessonsList: React.Dispatch<React.SetStateAction<Array<LessonType>>>
	currentCourse: CourseSingleType
	setCurrentCourse: React.Dispatch<React.SetStateAction<CourseSingleType>>
}

export const CourseContext = React.createContext<ContextType>({} as ContextType)

export const CourseContextProvider = ({children}: {children: React.ReactNode}) => {
	const videoRef = React.useRef<HTMLVideoElement>(null)
	const [offsetTime, setOffsetTime] = React.useState(PLAYER_START_POSITION)

	const [lessonsList, setLessonsList] = React.useState<Array<LessonType>>()
	const [activeLesson, setActiveLesson] = React.useState<LessonType>()
	const [currentCourse, setCurrentCourse] = React.useState<CourseSingleType>()

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
