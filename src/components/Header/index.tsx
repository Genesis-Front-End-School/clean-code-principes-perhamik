import React from 'react'

import {Navbar} from '@/src/ui'

const HOME_URL = {
	pathname: '/',
}

export const Header = () => {
	return (
		<header>
			<Navbar>
				<Navbar.Brand href={HOME_URL}>Courses</Navbar.Brand>
			</Navbar>
		</header>
	)
}
