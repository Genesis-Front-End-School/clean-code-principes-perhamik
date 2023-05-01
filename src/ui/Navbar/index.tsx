import React from 'react'

import type {ComponentProps} from '../types'
import {NavbarBrand} from './NavbarBrand'

const Navbar = ({children}: ComponentProps) => {
	return (
		<nav className="navbar bg-dark" data-bs-theme="dark">
			{children}
		</nav>
	)
}

export default Object.assign(Navbar, {Brand: NavbarBrand})
