'use client'

import React from 'react'

import {useTheme} from '@/src/processes/theme'

import styles from './ThemeToggle.module.scss'

export const ThemeToggle = () => {
	const {themeType, toggleTheme} = useTheme()

	return (
		<label className={styles.toggle}>
			<input
				type="checkbox"
				className={styles.toggle__input}
				checked={themeType === 'dark'}
				onChange={() => toggleTheme()}
			/>
			<span className={styles.toggle__check}></span>
		</label>
	)
}
