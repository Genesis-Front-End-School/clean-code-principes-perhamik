import Hls from 'hls.js'
import {describe, expect, it, vi} from 'vitest'

import {appendHlsErrorHandler, haveWatchedThisCourse} from '@/src/components/Lesson/utils'

import {course} from '../../services/apiData'

vi.mock('hls.js')

const currentCourse = course.lessons[0]

const lessonState = {
	lesson: currentCourse,
	time: 56,
}

const stored = JSON.stringify({lesson: lessonState.lesson.id, offsetTime: lessonState.time})

describe('Lesson utils', () => {
	it('HLS handle Error', () => {
		appendHlsErrorHandler(Hls.prototype, course.lessons[0])

		expect(Hls.prototype).toBeDefined()
	})

	it('Have watch check', () => {
		const {lesson, time} = haveWatchedThisCourse(stored, course.lessons)
		expect(lesson).toBeDefined()
		lesson && expect(lesson.id).toStrictEqual(currentCourse.id)
		expect(time).toStrictEqual(lessonState.time)
	})
})
