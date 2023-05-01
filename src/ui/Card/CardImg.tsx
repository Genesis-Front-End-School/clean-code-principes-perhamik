import Image from 'next/image'
import React from 'react'

type CardImgProps = {
	variant?: 'top' | 'bottom' | string
	style?: React.CSSProperties
	src: string
}

export const CardImg = ({variant, src, ...props}: CardImgProps) => {
	const _className = variant ? `card-img card-img-${variant}` : 'card-img'
	return <Image className={_className} src={src} alt="Card image" {...props} />
}
