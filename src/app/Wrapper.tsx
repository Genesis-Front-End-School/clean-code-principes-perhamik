'use client'

import React from 'react'

import {ThemeContext, ThemeProvider} from '@/src/processes/theme'

const ThemeContainer = ({children}: {children: React.ReactNode}) => {
	const {theme, themeType} = React.useContext(ThemeContext)
	const bodyBg = theme['--theme-background-page']

	return (
		<body data-theme={themeType} style={{backgroundColor: bodyBg}}>
			<div className="wrapper" style={{...theme} as React.CSSProperties}>
				{children}
			</div>
		</body>
	)
}

export const Wrapper = ({children}: {children: React.ReactNode}) => {
	return (
		<ThemeProvider>
			<ThemeContainer>{children}</ThemeContainer>
		</ThemeProvider>
	)
}
