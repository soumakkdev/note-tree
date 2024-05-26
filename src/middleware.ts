import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import pb from './lib/pb'

export async function middleware(request: NextRequest) {
	const pbAuthCookie = request.cookies.get('pb_auth')
	let isLoggedIn
	if (!pbAuthCookie) isLoggedIn = false
	// load auth store from cookie
	await pb.authStore.loadFromCookie(pbAuthCookie?.value ?? '')
	isLoggedIn = pb.authStore.isValid ?? false

	if (request?.nextUrl?.pathname?.startsWith('/login')) {
		// If already logged in and the request is to go to the login page,
		// Skip it and redirect to the home page.
		if (isLoggedIn) {
			return NextResponse.redirect(new URL('/', request.url))
		}
		return
	}

	// If not logged in then redirect to login page
	if (!isLoggedIn) {
		return NextResponse.redirect(new URL('/login', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
}
