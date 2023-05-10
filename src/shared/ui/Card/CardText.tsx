import React from 'react'

import type {ComponentProps} from '../types'
import styles from './styles.module.scss'

export const CardText = ({children}: ComponentProps) => {
	return <p className={`card-text ${styles.card__text}`}>{children}</p>
}
