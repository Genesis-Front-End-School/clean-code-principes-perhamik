import Hls from 'hls.js'
import {describe, expect, it, vi} from 'vitest'

import {appendHlsErrorHandler, haveWatchedThisCourse} from '@/src/features/Lesson/utils'

import {singleCourse} from '@/__tests__/apiResponses'

vi.mock('hls.js')

const currentCourse = singleCourse.lessons[0]

const lessonState = {
	lesson: currentCourse,
	time: 56,
}

const stored = JSON.stringify({lesson: lessonState.lesson.id, offsetTime: lessonState.time})

describe('Lesson utils', () => {
	it('HLS handle Error', () => {
		appendHlsErrorHandler(Hls.prototype, singleCourse.lessons[0])

		expect(Hls.prototype).toBeDefined()
	})

	it('Have watch check', () => {
		const {lesson, time} = haveWatchedThisCourse(stored, singleCourse.lessons)
		expect(lesson).toBeDefined()
		lesson && expect(lesson.id).toStrictEqual(currentCourse.id)
		expect(time).toStrictEqual(lessonState.time)
	})
})
