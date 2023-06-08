import Image from 'next/image'
import React from 'react'

import {mergeWithAdditionalClassName} from '../utils'

type CardImgProps = {
	variant?: 'top' | 'bottom' | string
	style?: React.CSSProperties
	src: string
	width: number
	height: number
}

export const CardImg = ({variant, src, width, height, ...props}: CardImgProps) => {
	return (
		<Image
			className={mergeWithAdditionalClassName('card-img', variant ? `card-img-${variant}` : '')}
			src={src}
			width={width}
			height={height}
			alt="Card image"
			{...props}
		/>
	)
}
