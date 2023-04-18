import React from 'react'
import {Pagination} from 'react-bootstrap'

import {AppContext} from '@/src/context/index'

const PaginationCourses = ({totalCount, pageSize}: {totalCount: number; pageSize: number}) => {
	const {currentPage, setCurrentPage} = React.useContext(AppContext)
	const pagesLength = Math.ceil(totalCount / pageSize)

	const onPageNumberClick = (page: number) => {
		setCurrentPage(() => {
			if (pagesLength < page) return pagesLength
			return page > 0 ? page : 1
		})
	}

	return (
		<Pagination className="justify-content-center">
			<Pagination.Prev disabled={currentPage <= 1} onClick={() => setCurrentPage((prev) => prev - 1)} />
			{Array(pagesLength)
				.fill(1)
				.map((_, id) => {
					return (
						<Pagination.Item
							active={id + 1 === currentPage}
							key={`pagination_item_${id}`}
							onClick={() => onPageNumberClick(id + 1)}>
							{id + 1}
						</Pagination.Item>
					)
				})}

			<Pagination.Next disabled={currentPage >= pagesLength} onClick={() => setCurrentPage((prev) => prev + 1)} />
		</Pagination>
	)
}

export default PaginationCourses
