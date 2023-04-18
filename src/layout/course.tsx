import React from 'react'
import {Container, Image, Row, Col, ListGroup} from 'react-bootstrap'
import {useLocalStorage, useInterval, useEffectOnce} from 'usehooks-ts'
import Hls from 'hls.js'
import type {Events, ErrorData} from 'hls.js'

import {AppContext} from '@/src/context'
import {getPreviewWebp, getPreviewSet} from '@/src/services'
import {transformDuration, delayedAction} from '@/src/utils'

import type {CourseSingleType, LessonType} from '@/src/types'

type SavedType = {
	lesson: string
	offsetTime: string
}

const PLAYER_START_POSITION = 0.4

export default function CourseLayout({data}: {data: CourseSingleType}) {
	const videoRef = React.useRef<HTMLVideoElement>(null)
	const {hls, setHls} = React.useContext(AppContext)
	const [currentCourseLesson, setCurrentCourseLesson] = useLocalStorage(data.id, '')
	const [offsetTime, setOffsetTime] = React.useState(PLAYER_START_POSITION)
	const [activeLesson, setActiveLesson] = React.useState<LessonType>()

	const setActiveLessonAndAppendVideo = (lesson: LessonType, time: number = PLAYER_START_POSITION) => {
		const _hls = hls ? hls : new Hls({startPosition: time})
		if (!lesson || !_hls) return

		if (offsetTime !== time) {
			setOffsetTime(time)
		}

		setActiveLesson(() => lesson)

		const HlsErrorHandler = (event: Events.ERROR, data: ErrorData) => {
			if (!_hls) return

			if (event === 'hlsError' && _hls) {
				_hls.stopLoad()
				_hls.detachMedia()
			}

			if (data.fatal) {
				switch (data.type) {
					case Hls.ErrorTypes.NETWORK_ERROR:
						console.log('fatal network error encountered, try to recover')
						_hls.startLoad()
						break

					case Hls.ErrorTypes.MEDIA_ERROR:
						console.log('fatal media error encountered, try to recover')
						_hls.recoverMediaError()
						break

					default:
						_hls.destroy()
						break
				}
			}
		}

		_hls.off(Hls.Events.ERROR, HlsErrorHandler)
		_hls.off(Hls.Events.MEDIA_ATTACHED, () => _hls.loadSource(lesson.link))
		_hls.on(Hls.Events.ERROR, HlsErrorHandler)
		_hls.on(Hls.Events.MEDIA_ATTACHED, () => _hls.loadSource(lesson.link))

		delayedAction(500, () => _hls && _hls.attachMedia(videoRef.current))
	}

	const onListItemClick = (lesson: LessonType) => {
		setActiveLessonAndAppendVideo(lesson)
	}

	useEffectOnce(() => {
		setHls(() => new Hls({startPosition: offsetTime}))

		const haveWatchedThisCourse = () => {
			if (!currentCourseLesson) return

			const parsedCourse = JSON.parse(currentCourseLesson) as SavedType
			const time = !isNaN(parseInt(parsedCourse.offsetTime)) ? parseInt(parsedCourse.offsetTime) : PLAYER_START_POSITION
			const lesson = data.lessons.find((item) => item.id === parsedCourse.lesson)

			if (lesson) {
				setActiveLessonAndAppendVideo(lesson, time)
			}
		}

		haveWatchedThisCourse()
	})

	useInterval(() => {
		const saveCurrentProgress = () => {
			const _id = activeLesson ? activeLesson.id : ''
			const videoElement = videoRef ? videoRef.current : null
			if (!videoElement || !_id) return

			//@ts-ignore
			const _time = videoElement.currentTime ? Math.floor(videoElement.currentTime) : 0

			if (_time > 2) {
				setCurrentCourseLesson(() => JSON.stringify({lesson: _id, offsetTime: _time}))
			}
		}

		saveCurrentProgress()
	}, 5000)

	return (
		<>
			<section className="px-4 py-5">
				<Container className="col-xxl-8">
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
				</Container>
			</section>
			<Container>
				<Row>
					<Col sm={8}>
						<video ref={videoRef} controls className="d-flex w-100 h-100" />
					</Col>
					<Col sm={4}>
						<ListGroup>
							{data.lessons.map((lesson, _id) => (
								<ListGroup.Item
									key={lesson.id}
									as="button"
									active={activeLesson && activeLesson.id === lesson.id}
									action
									onClick={() => onListItemClick(lesson)}
									className={`d-flex justify-content-between align-items-start ${!lesson.available ? 'disabled' : ''}`}>
									<h3 className={`h6 ${!lesson.available ? 'text-muted' : ''}`}>{`${lesson.order}. ${lesson.title}`}</h3>
									<span>{transformDuration(lesson.duration)}</span>
								</ListGroup.Item>
							))}
						</ListGroup>
					</Col>
				</Row>
			</Container>
		</>
	)
}
