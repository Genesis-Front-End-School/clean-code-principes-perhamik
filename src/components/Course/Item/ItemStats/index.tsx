import type {CourseType} from '@/src/types'
import {Badge, Col, Row} from '@/src/ui'

import {Rating} from './Rating'

export const ItemStats = ({tags, rating}: {tags: CourseType['tags']; rating: CourseType['rating']}) => {
	return (
		<Row className="mx-auto w-100 justify-content-between align-items-center">
			<Col className="p-0">
				{tags.map((tag) => (
					<Badge key={tag} bg="success" className="text-capitalize">
						{tag}
					</Badge>
				))}
			</Col>
			<Col className="p-0">
				<Rating rating={rating} />
			</Col>
		</Row>
	)
}
