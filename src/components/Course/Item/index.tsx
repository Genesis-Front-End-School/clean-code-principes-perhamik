import Link from 'next/link'

import type {CourseType} from '@/src/types'
import {Card} from '@/src/ui'

import {ItemImage} from './ItemImage'
import {ItemStats} from './ItemStats'

export const Item = ({data}: {data: CourseType}) => {
	const {id, title, description, previewImageLink, tags, rating} = data
	return (
		<Link href={{pathname: `/course/${id}`}}>
			<Card className="h-100">
				<ItemImage url={previewImageLink} />

				<Card.Body className="d-grid justify-items-start gap-2">
					<ItemStats tags={tags} rating={rating} />

					<Card.Title>{title}</Card.Title>
					<Card.Text>{description}</Card.Text>
				</Card.Body>
			</Card>
		</Link>
	)
}
