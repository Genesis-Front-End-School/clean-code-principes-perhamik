import {ResponseCookie} from 'next/dist/compiled/@edge-runtime/cookies'
import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'

import API from '@/src/services/api'

const matchPathname = (path: string): boolean => {
	return path.startsWith('/course/') || path === '/'
}

export async function middleware(request: NextRequest): Promise<NextResponse> {
	if (!matchPathname(request.nextUrl.pathname)) return NextResponse.next()

	const token = API.getToken() || request.cookies.get('token')?.value || ''

	const tokenCookies: ResponseCookie = {
		name: 'token',
		value: token,
		path: '/',
		secure: true,
		expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
	}
	if (!tokenCookies.value) {
		tokenCookies.value = await API.authenticateGuestUser()
	}
	const response = NextResponse.next()

	response.cookies.set(tokenCookies)

	return response
}
