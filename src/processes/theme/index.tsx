'use client'

import React from 'react'

import {useLocalStorage} from '@/src/shared/lib'

import type {Theme, ThemeType} from './config'
import {THEMES} from './config'

interface ThemeContextProps {
	themeType: ThemeType
	theme: Theme
	setCurrentTheme: React.Dispatch<React.SetStateAction<ThemeType>> | null
	toggleTheme: Function
}

export const ThemeContext = React.createContext<ThemeContextProps>({
	themeType: 'light',
	theme: THEMES['light'],
	setCurrentTheme: null,
	toggleTheme: () => {},
})

const getDefaultTheme = (): ThemeType => {
	if (!window || !window.matchMedia) return 'light'

	return window.matchMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light'
}

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
	const [savedTheme, setSavedTheme] = useLocalStorage<ThemeType>({key: 'theme', value: getDefaultTheme()})
	const [currentTheme, setCurrentTheme] = React.useState<ThemeType>(getDefaultTheme())

	const toggleTheme = () => {
		setCurrentTheme((prev) => {
			const nextTheme = prev === 'dark' ? 'light' : 'dark'
			setSavedTheme(nextTheme)
			return nextTheme
		})
	}

	React.useLayoutEffect(() => {
		if (currentTheme !== savedTheme) {
			setCurrentTheme(savedTheme)
		}
	}, [savedTheme])

	React.useLayoutEffect(() => {
		if (currentTheme !== savedTheme) {
			setSavedTheme(currentTheme)
		}
	}, [currentTheme])

	return (
		<ThemeContext.Provider
			value={{
				themeType: currentTheme,
				theme: THEMES[currentTheme],
				setCurrentTheme,
				toggleTheme,
			}}
		>
			{children}
		</ThemeContext.Provider>
	)
}

export const useTheme = () => React.useContext(ThemeContext)
