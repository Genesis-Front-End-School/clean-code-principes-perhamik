import {render, within} from '@testing-library/react'
import {describe, expect, it} from 'vitest'

import {Header} from '@/src/components/Header'

describe('Header', () => {
	it('renders properly', () => {
		const header = render(<Header />)
		expect(header.getByRole('heading', {level: 1, name: /courses/i})).toBeDefined()

		const link = within(header.getByRole('link'))
		expect(link.getByRole('img', {name: /wisey logo/i})).toBeDefined()
	})
})
