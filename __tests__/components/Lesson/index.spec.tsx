import {getAllByRole, render, screen} from '@testing-library/react'
import {beforeAll, describe, expect, it, vi} from 'vitest'

import {Single} from '@/src/app/course/[id]/Single'

import {course} from '../../services/apiData'

describe('Single course page', () => {
	beforeAll(() => {
		render(<Single course={course} />)
	})

	it('Single course has preview', () => {
		const img = screen.getByAltText('Course Preview')

		expect(img).toBeDefined()
	})

	it('Single course has title', () => {
		const title = screen.getByText(course.title)

		expect(title).toBeDefined()
	})

	it('Single course has lessons list', () => {
		const list = screen.getByRole('list')
		const lessons = getAllByRole(list, 'heading', {level: 3})

		expect(list).toBeDefined()
		expect(lessons.length).toEqual(course.lessons.length)
	})
})
