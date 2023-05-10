import React from 'react'
import {Col, Image, Row} from 'react-bootstrap'

import {getPreviewSet, getPreviewWebp} from '@/src/services/previews'
import type {CourseType} from '@/src/types'

export default function LessonInfo({data}: {data: CourseType}) {
	return (
		<Row className="flex-lg-row-reverse align-items-center g-5">
			<Col col={10} col-sm={8} col-lg={6}>
				<Image
					srcSet={getPreviewSet(data.previewImageLink)}
					src={getPreviewWebp(data.previewImageLink)}
					className="d-block mx-lg-auto img-fluid"
					alt="Course Preview"
				/>
			</Col>
			<Col col-lg={6}>
				<h2 className="display-5 fw-bold lh-1 mb-3">{data.title}</h2>
				<p className="lead">{data.description}</p>
			</Col>
		</Row>
	)
}
