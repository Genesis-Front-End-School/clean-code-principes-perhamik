import React from 'react'

import type {ComponentProps} from '../types'
import {mergeWithAdditionalClassName} from '../utils'
import {CardBody} from './CardBody'
import {CardImg} from './CardImg'
import {CardText} from './CardText'
import {CardTitle} from './CardTitle'

const Card = ({children, className}: ComponentProps) => {
	return <div className={mergeWithAdditionalClassName('card', className)}>{children}</div>
}

export default Object.assign(Card, {Body: CardBody, Title: CardTitle, Text: CardText, Img: CardImg})
