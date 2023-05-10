import React from 'react'

import {Header} from '@/src/features/Header'
import '@/src/ui/global.scss'

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang="en">
			<head>
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
					integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
					crossOrigin="anonymous"
				/>

				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.min.css"
				></link>
			</head>
			<body>
				<Header />
				<main>{children}</main>
			</body>
		</html>
	)
}
