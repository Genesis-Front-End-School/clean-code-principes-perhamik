import Hls from 'hls.js'
import React from 'react'
import {useEventListener, useInterval, useLocalStorage} from 'usehooks-ts'

import {CourseContext} from '@/src/components/Lesson/context'
import {appendHlsErrorHandler, haveWatchedThisCourse} from '@/src/components/Lesson/utils'

import {PLAYER_START_POSITION} from '@/src/services/const'
import {LessonType} from '@/src/types'
import {delayedAction} from '@/src/utils'

export const LessonVideo = () => {
	const {videoRef, offsetTime, setOffsetTime, activeLesson, setActiveLesson, currentCourse} = React.useContext(CourseContext)
	const [currentCourseLesson, setCurrentCourseLesson] = useLocalStorage(currentCourse?.id || '', '')

	const setActiveLessonAndAppendVideo = (lesson: LessonType, time: number = PLAYER_START_POSITION) => {
		const hls = new Hls({startPosition: time})
		if (!lesson) return

		if (offsetTime !== time) {
			setOffsetTime(time)
		}

		setActiveLesson(() => lesson)

		appendHlsErrorHandler(hls, lesson)

		delayedAction(500, () => videoRef.current && hls && hls.attachMedia(videoRef.current))
	}

	useEventListener(
		'change',
		((e: CustomEvent) => {
			const lesson = e.detail.lesson

			lesson && setActiveLessonAndAppendVideo(lesson)
		}) as EventListener,
		videoRef,
	)

	useEventListener(
		'input',
		((e: CustomEvent) => {
			if (!e.detail || !e.detail.lessonsList || !currentCourseLesson) return
			const lessonsList = e.detail.lessonsList

			const {lesson, time} = haveWatchedThisCourse(currentCourseLesson, lessonsList)

			lesson && setActiveLessonAndAppendVideo(lesson, time)
		}) as EventListener,
		videoRef,
	)

	useInterval(() => {
		const saveCurrentProgress = () => {
			const id = activeLesson?.id || ''
			const videoElement = videoRef?.current
			if (!videoElement || !id) return

			const time = videoElement.currentTime ? Math.floor(videoElement.currentTime) : 0

			if (time > 2) {
				setCurrentCourseLesson(() => JSON.stringify({lesson: id, offsetTime: time}))
			}
		}

		saveCurrentProgress()
	}, 5000)
	return <video ref={videoRef} controls className="d-flex w-100 h-100" />
}
