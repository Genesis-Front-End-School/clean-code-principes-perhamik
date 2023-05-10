import Head from 'next/head'
import React from 'react'
import {Col, Container, Row} from 'react-bootstrap'

export default function FourOhFour() {
	return (
		<>
			<Head>
				<title>404 - Not Found</title>
				<meta name="description" content="Not found" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Container>
				<Row className="my-4 row-cols-1 g-3">
					<Col>
						<h1>Sorry, nothing here...</h1>
					</Col>
				</Row>
			</Container>
		</>
	)
}
