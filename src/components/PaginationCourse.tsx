import React from 'react'
import {Pagination} from 'react-bootstrap'

import {AppContext} from '@/src/context/index'

const PaginationCourses = ({totalCount, pageSize}: {totalCount: number; pageSize: number}) => {
	const {currentPage, setCurrentPage} = React.useContext(AppContext)
	const pagesLength = Math.ceil(totalCount / pageSize)

	const onPageClick = (page: number) => {
		const _page = pagesLength >= page ? (page > 0 ? page : 1) : pagesLength
		setCurrentPage(_page)
	}

	return (
		<Pagination className="justify-content-center">
			<Pagination.Prev onClick={() => onPageClick(currentPage - 1)} />
			{Array(pagesLength)
				.fill(1)
				.map((_, id) => {
					return (
						<Pagination.Item
							active={id + 1 === currentPage}
							key={`pagination_item_${id}`}
							onClick={() => onPageClick(id + 1)}>
							{id + 1}
						</Pagination.Item>
					)
				})}

			<Pagination.Next onClick={() => onPageClick(currentPage + 1)} />
		</Pagination>
	)
}

export default PaginationCourses
