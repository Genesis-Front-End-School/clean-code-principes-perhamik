import React from 'react'

import type {ComponentProps} from '../types'
import {ListGroupItem} from './ListGroupItem'

const ListGroup = ({children}: ComponentProps) => {
	return <ul className="list-group">{children}</ul>
}

export default Object.assign(ListGroup, {Item: ListGroupItem})
