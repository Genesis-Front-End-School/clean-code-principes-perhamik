import React from 'react'

import type {ComponentProps} from '../types'
import {mergeWithAdditionalClassName} from '../utils'

export const CardBody = ({children, className}: ComponentProps) => {
	return <div className={mergeWithAdditionalClassName('card-body', className)}>{children}</div>
}
