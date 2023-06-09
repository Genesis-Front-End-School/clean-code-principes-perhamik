'use client'

import {createContext, useContext, useEffect, useLayoutEffect, useRef, useState} from 'react'
import type {Dispatch, MutableRefObject, ReactNode, SetStateAction} from 'react'

import {useLocalStorage} from '@/src/shared/lib'

import type {Theme, ThemeType} from './config'
import {THEMES} from './config'

interface ThemeContextProps {
	themeType: ThemeType
	theme: Theme
	setCurrentTheme: Dispatch<SetStateAction<ThemeType>> | null
	toggleTheme: Function
	togglerRef?: MutableRefObject<HTMLInputElement | null>
}

export const ThemeContext = createContext<ThemeContextProps>({
	themeType: 'light',
	theme: THEMES['light'],
	setCurrentTheme: null,
	toggleTheme: () => {},
})

export const ThemeProvider = ({children}: {children: ReactNode}) => {
	const togglerRef = useRef<HTMLInputElement>(null)
	const [currentTheme, setCurrentTheme] = useState<ThemeType>('light')
	const [savedTheme, setSavedTheme] = useLocalStorage<ThemeType>({key: 'theme', value: currentTheme})

	const toggleTheme = () => {
		setCurrentTheme((prev) => {
			const nextTheme = prev === 'dark' ? 'light' : 'dark'
			setSavedTheme(nextTheme)
			return nextTheme
		})
	}

	if (togglerRef?.current) {
		togglerRef.current.checked = savedTheme === 'dark'
	}

	useLayoutEffect(() => {
		if (currentTheme !== savedTheme) {
			setCurrentTheme(savedTheme)
		}
	}, [savedTheme])

	useEffect(() => {
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
				togglerRef,
			}}
		>
			{children}
		</ThemeContext.Provider>
	)
}

export const useTheme = () => useContext(ThemeContext)
