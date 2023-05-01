import React from 'react'

import {Container, Navbar} from '@/src/ui'

const HOME_URL = {
	pathname: '/',
}

export const Header = () => {
	return (
		<header>
			<Navbar>
				<Container>
					<Navbar.Brand href={HOME_URL}>Courses</Navbar.Brand>
				</Container>
			</Navbar>
		</header>
	)
}
