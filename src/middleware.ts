import {ResponseCookie} from 'next/dist/compiled/@edge-runtime/cookies'
import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'

import API from '@/src/services/api'

export async function middleware(request: NextRequest) {
	const tokenCookies: ResponseCookie = {
		name: 'token',
		value: API.getToken() ? API.getToken() : request.cookies.get('token')?.value || '',
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
