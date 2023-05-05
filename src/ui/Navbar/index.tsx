import React from 'react'

import type {ComponentProps} from '../types'
import {NavbarBrand} from './NavbarBrand'

const Navbar = ({children}: ComponentProps) => {
	return (
		<nav className="navbar bg-dark text-white">
			<div className="container-fluid">{children}</div>
		</nav>
	)
}

export default Object.assign(Navbar, {Brand: NavbarBrand})
