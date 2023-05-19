'use client'

export default function GlobalError({error, reset}: {error: Error; reset: () => void}) {
	return (
		<html>
			<body>
				<h2>Something went wrong!</h2>
				<h6>{error.name}</h6>
				<h6>{error.message}</h6>
				<button onClick={() => reset()}>Try again</button>
			</body>
		</html>
	)
}
