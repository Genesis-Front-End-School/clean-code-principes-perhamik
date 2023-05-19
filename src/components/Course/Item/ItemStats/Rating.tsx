import React from 'react'

import type {CourseType} from '@/src/types'

const initialStarClass: Array<string> = Array(5).fill('bi-star')

const getListOfStarClasses = (rating: CourseType['rating']) =>
	initialStarClass.map((star, id) => {
		if (Math.floor(rating) === id && Math.ceil(rating) > id) return `${star}-half`

		return Math.floor(rating) > id ? `${star}-fill` : star
	})

export const Rating = ({rating}: {rating: CourseType['rating']}) => {
	//const listOfStarClasses = React.useMemo(() => getListOfStarClasses(rating), [rating])
	const listOfStarClasses = getListOfStarClasses(rating)

	return (
		<div className="d-flex gap-1 justify-content-end">
			<div className="d-flex gap-1 text-warning">
				{listOfStarClasses.map((star, _id) => (
					<i key={`${star}_${_id}`} className={`bi ${star}`}></i>
				))}
			</div>
			<span className="text">{rating}</span>
		</div>
	)
}
