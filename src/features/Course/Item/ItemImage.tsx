import {getPreviewWebp} from '@/src/shared/lib'
import {Card} from '@/src/shared/ui'

export const ItemImage = ({url}: {url: string}) => {
	return (
		<Card.Img
			variant="top"
			src={getPreviewWebp(url)}
			width={512}
			height={512}
			style={{minHeight: '164px', objectFit: 'cover', width: 'auto', height: '100%'}}
		/>
	)
}
