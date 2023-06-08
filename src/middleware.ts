import type {NextRequest, NextResponse} from 'next/server'

import {
	generateNextResponseWithCookies,
	getTokenFromNextRequest,
	setTokenIntoResponseCookies,
	validateOldTokenOrGetNew,
} from '@/src/processes/middleware'

export const config = {
	matcher: ['/', '/course/:path*'],
}

export async function middleware(request: NextRequest): Promise<NextResponse> {
	const oldToken = getTokenFromNextRequest(request)
	const token = await validateOldTokenOrGetNew(oldToken)
	const tokenCookies = setTokenIntoResponseCookies(token)

	return generateNextResponseWithCookies(tokenCookies)
}
