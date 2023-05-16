import Link from 'next/link'

import type {CourseType} from '@/src/shared/api'
import {Card} from '@/src/shared/ui'

import {ItemImage} from './ItemImage'
import {ItemStats} from './ItemStats'

export const Item = ({data}: {data: CourseType}) => {
	const {id, title, description, previewImageLink, tags, rating} = data
	return (
		<Link href={{pathname: `/course/${id}`}} className="link">
			<Card className="h-100">
				<ItemImage url={previewImageLink} />

				<Card.Body className="d-grid justify-items-start gap-2" style={{minHeight: '164px'}}>
					<ItemStats tags={tags} rating={rating} />

					<Card.Title>{title}</Card.Title>
					<Card.Text>{description}</Card.Text>
				</Card.Body>
			</Card>
		</Link>
	)
}
