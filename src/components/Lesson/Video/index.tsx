import Hls from 'hls.js'
import React from 'react'
import {useEffectOnce, useEventListener, useInterval, useLocalStorage} from 'usehooks-ts'

import {CourseContext} from '@/src/components/Lesson/context'
import {appendHlsErrorHandler, haveWatchedThisCourse} from '@/src/components/Lesson/utils'

import {PLAYER_START_POSITION} from '@/src/services/const'
import {LessonType} from '@/src/types'
import {delayedAction} from '@/src/utils'

export function LessonVideo() {
	const {videoRef, offsetTime, setOffsetTime, activeLesson, setActiveLesson, lessonsList} = React.useContext(CourseContext)
	const [currentCourseLesson, setCurrentCourseLesson] = useLocalStorage(activeLesson.id, '')

	const setActiveLessonAndAppendVideo = (lesson: LessonType, time: number = PLAYER_START_POSITION) => {
		const hls = new Hls({startPosition: time})
		if (!lesson) return

		if (offsetTime !== time) {
			setOffsetTime(time)
		}

		setActiveLesson(() => lesson)

		appendHlsErrorHandler(hls, lesson)

		delayedAction(500, () => hls && hls.attachMedia(videoRef.current))
	}

	useEventListener('change', (e: CustomEvent) => {
		const lesson = e.detail.lesson
		lesson && setActiveLessonAndAppendVideo(lesson)
	})

	useEffectOnce(() => {
		const {lesson, time} = haveWatchedThisCourse(currentCourseLesson, lessonsList)

		if (lesson) {
			setActiveLessonAndAppendVideo(lesson, time)
		}
	})

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
