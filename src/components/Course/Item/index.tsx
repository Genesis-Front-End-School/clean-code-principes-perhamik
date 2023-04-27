import {Button, Card, Col} from 'react-bootstrap'

import type {CourseType} from '@/src/types'

import ItemImage from './ItemImage'
import ItemStats from './ItemStats'

export function Item({data}: {data: CourseType}) {
	const {id, title, description, previewImageLink, tags, rating} = data
	return (
		<Col>
			<Card className="h-100">
				<ItemImage url={previewImageLink} />

				<Card.Body className="d-grid justify-items-start gap-2">
					<ItemStats tags={tags} rating={rating} />

					<Card.Title>{title}</Card.Title>
					<Card.Text>{description}</Card.Text>

					<Button variant="outline-primary" href={`/course/${id}`} className="w-50 align-self-end mx-auto">
						Watch
					</Button>
				</Card.Body>
			</Card>
		</Col>
	)
}

export default Item
