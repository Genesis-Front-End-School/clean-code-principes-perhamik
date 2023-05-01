import React from 'react'

import type {ComponentProps} from '../types'

export const CardTitle = ({children}: ComponentProps) => {
	return <h5 className="card-title">{children}</h5>
}
