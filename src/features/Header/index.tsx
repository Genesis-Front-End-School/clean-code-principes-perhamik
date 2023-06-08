import Image from 'next/image'
import React from 'react'

import {Navbar} from '@/src/shared/ui'

import logo from '@/public/logo.svg'

import {ThemeToggle} from './ThemeToggle'

const HOME_URL = {
	pathname: '/',
}

export const Header = () => {
	return (
		<header aria-label="header">
			<Navbar>
				<Navbar.Brand href={HOME_URL}>
					<Image
						src={logo}
						width={103}
						height={28}
						className="header__logo"
						alt="Wisey logo"
						priority={true}
					/>
				</Navbar.Brand>
				<h1>courses</h1>
				<ThemeToggle />
			</Navbar>
		</header>
	)
}
