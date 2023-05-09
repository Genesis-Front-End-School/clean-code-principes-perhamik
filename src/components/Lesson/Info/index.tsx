import Image from 'next/image'
import React from 'react'

import {getPreviewWebp} from '@/src/services/previews'
import type {CourseSingleType} from '@/src/types'
import {Col, Row} from '@/src/ui'

export const LessonInfo = ({data}: {data: CourseSingleType}) => {
	return (
		<Row className="flex-lg-row-reverse align-items-center g-5">
			<Col col={10} col-sm={8} col-lg={6}>
				<Image
					src={getPreviewWebp(data.previewImageLink)}
					className="d-block mx-lg-auto img-fluid"
					alt="Course Preview"
					width={512}
					height={512}
					style={{minHeight: '164px', objectFit: 'cover', width: 'auto', height: 'auto'}}
				/>
			</Col>
			<Col col-lg={6}>
				<h2 className="display-5 fw-bold lh-1 mb-3">{data.title}</h2>
				<p className="lead">{data.description}</p>
			</Col>
		</Row>
	)
}
