import Hls, {ErrorData, Events} from 'hls.js'

import type {LessonType, SavedCourseInfoType} from '@/src/shared/api'
import {env} from '@/src/shared/config'

export const appendHlsErrorHandler = (hls: Hls, lesson: LessonType) => {
	if (!hls) return

	const HlsErrorHandler = (event: Events.ERROR, data: ErrorData) => {
		if (event === 'hlsError' && hls) {
			hls.stopLoad()
			hls.detachMedia()
		}

		if (data.fatal) {
			switch (data.type) {
				case Hls.ErrorTypes.NETWORK_ERROR:
					console.log('fatal network error encountered, try to recover')
					hls.startLoad()
					break

				case Hls.ErrorTypes.MEDIA_ERROR:
					console.log('fatal media error encountered, try to recover')
					hls.recoverMediaError()
					break

				default:
					hls.destroy()
					break
			}
		}
	}

	hls.off(Hls.Events.ERROR, HlsErrorHandler)
	hls.off(Hls.Events.MEDIA_ATTACHED, () => hls.loadSource(lesson.link))
	hls.on(Hls.Events.ERROR, HlsErrorHandler)
	hls.on(Hls.Events.MEDIA_ATTACHED, () => hls.loadSource(lesson.link))
}

export const haveWatchedThisCourse = (currentCourseLesson: string, list: Array<LessonType>) => {
	if (!currentCourseLesson) return {lesson: null, time: env.PLAYER_START_POSITION}

	const parsedCourse = JSON.parse(currentCourseLesson) as SavedCourseInfoType
	const time = !isNaN(parseInt(parsedCourse.offsetTime))
		? parseInt(parsedCourse.offsetTime)
		: env.PLAYER_START_POSITION
	const lesson = list.find((item) => item.id === parsedCourse.lesson)

	return {lesson, time}
}
