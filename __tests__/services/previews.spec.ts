import {describe, expect, it} from 'vitest'

import {getLessonPreviewSet, getLessonPreviewWebp, getPreviewSet, getPreviewWebp} from '@/src/services/previews'
import {LessonType} from '@/src/types'

const lesson: LessonType = {
	id: '278e5a0e-8df1-4646-9984-10289d52dc2d',
	title: 'Why we lack motivation',
	duration: 255,
	order: 1,
	type: 'video',
	status: 'unlocked',
	link: 'https://wisey.app/videos/lack-of-motivation-how-to-overcome-it/lesson-1/AppleHLS1/lesson-1.m3u8',
	previewImageLink: 'https://wisey.app/assets/images/web/lessons-covers/lack-of-motivation-how-to-overcome-it/lesson-1',
	meta: null,
}
const path = 'http://localhost:3000/images'

describe('Previews', () => {
	it('getPreviewWebp', () => {
		const webp = getPreviewWebp(path)

		expect(webp).toStrictEqual(`${path}/cover.webp`)
	})

	it('getLessonPreviewWebp', () => {
		const webpLesson = getLessonPreviewWebp(lesson)

		expect(webpLesson).toStrictEqual(`${lesson.previewImageLink}/lesson-${lesson.order}.webp`)
	})

	it('getPreviewSet', () => {
		const previewSet = getPreviewSet(path)

		expect(previewSet).toStrictEqual(`${path}/cover.webp, ${path}/cover.png`)
	})

	it('getLessonPreviewSet', () => {
		const previewSetLesson = getLessonPreviewSet(lesson)

		expect(previewSetLesson).toStrictEqual(
			`${lesson.previewImageLink}/lesson-${lesson.order}.webp, ${lesson.previewImageLink}/lesson-${lesson.order}.png`,
		)
	})
})
