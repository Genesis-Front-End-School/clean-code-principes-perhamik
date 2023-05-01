import {Item} from '@/src/components/Course'

import {CourseType} from '@/src/types'
import {Row} from '@/src/ui'

export const List = ({courses}: {courses: Array<CourseType>}) => {
	if (!courses) return null

	return (
		<Row className="my-4 row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
			{courses.map((course) => (
				<Item key={course.id} data={course} />
			))}
		</Row>
	)
}
