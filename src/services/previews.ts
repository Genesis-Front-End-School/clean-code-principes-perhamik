import type {LessonType} from '@/src/types'

export const getPreviewWebp = (path: string): string => `${path}/cover.webp`

export const getPreviewSet = (path: string): string => `${getPreviewWebp(path)}, ${path}/cover.png`

export const getLessonPreviewWebp = (lesson: LessonType): string => `${lesson.previewImageLink}/lesson-${lesson.order}.webp`

export const getLessonPreviewSet = (lesson: LessonType): string =>
	`${getLessonPreviewWebp(lesson)}, ${lesson.previewImageLink}/lesson-${lesson.order}.png`
