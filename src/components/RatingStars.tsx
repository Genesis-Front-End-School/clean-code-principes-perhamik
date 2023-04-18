import React from 'react'

const RatingStars = ({rating}: {rating: number}) => {
	const getRatingStarClass = (star: string, num: number) => {
		if (Math.floor(rating) === num && Math.ceil(rating) > num) return `${star}-half`

		return Math.floor(rating) > num ? `${star}-fill` : star
	}

	const initialStarClass = Array(5).fill('bi-star')

	const listOfStarClasses = initialStarClass.map((item, id) => getRatingStarClass(item, id))

	return (
		<div className="d-flex gap-1 justify-content-end">
			<div className="d-flex" style={{gap: '2px', color: 'var(--bs-orange)'}}>
				{listOfStarClasses.map((star, _id) => (
					<i className={`bi ${star}`} key={`${star}_${_id}`}></i>
				))}
			</div>
			<span className="text">{rating}</span>
		</div>
	)
}

export default RatingStars
