import React from 'react'

import type {ComponentProps} from '../types'

export const CardText = ({children}: ComponentProps) => {
	return <p className="card-text">{children}</p>
}
