import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'

import {AppContext} from '@/src/context'
import PaginationCourses from '@/src/components/PaginationCourse'
import CourseCard from '@/src/components/CourseCard'

import type {CourseType} from '@/src/types'

const PAGE_SIZE = 10

export default function CoursesListLayout({data}: {data: Array<CourseType>}) {
	const {currentPage} = React.useContext(AppContext)
	const currentList = React.useMemo(
		() => data.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
		[data, currentPage],
	)
	return (
		<Container>
			<Row className="my-4 row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
				{!!currentList &&
					currentList.length > 0 &&
					currentList.map((course) => (
						<Col key={course.id}>
							<CourseCard data={course} />
						</Col>
					))}
			</Row>
			<PaginationCourses totalCount={data.length} pageSize={PAGE_SIZE} />
		</Container>
	)
}
