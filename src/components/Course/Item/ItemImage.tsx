import {Card} from 'react-bootstrap'

import {getPreviewSet, getPreviewWebp} from '@/src/services/previews'

export default function ItemImage({url}: {url: string}) {
	return (
		<Card.Img
			variant="top"
			srcSet={getPreviewSet(url)}
			src={getPreviewWebp(url)}
			style={{minHeight: '164px', objectFit: 'cover'}}
		/>
	)
}
