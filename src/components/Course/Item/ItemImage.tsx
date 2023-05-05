import {getPreviewWebp} from '@/src/services/previews'
import {Card} from '@/src/ui'

export const ItemImage = ({url}: {url: string}) => {
	return (
		<Card.Img
			variant="top"
			src={getPreviewWebp(url)}
			width={512}
			height={512}
			style={{minHeight: '164px', objectFit: 'cover', width: 'auto', height: 'auto'}}
		/>
	)
}
