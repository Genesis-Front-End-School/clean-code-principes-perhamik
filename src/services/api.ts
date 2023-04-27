import {LessonType} from '../types'

export const fetchAuth = () =>
	fetch('/api/auth')
		.then((req) => req.json())
		.catch((err) => console.warn(err))

export const fetchCourses = () =>
	fetch('/api/courses')
		.then((req) => req.json())
		.then((data) => data.data)
		.catch((err) => console.warn(err))

export const checkLessonsAccess = async (list: Array<LessonType>) => {
	const result: Array<number> = []
	for await (let lesson of list) {
		try {
			const res = await fetch(lesson.link)
			result.push(res.status)
		} catch (err) {
			console.warn(err)
		}
	}

	return result
}
