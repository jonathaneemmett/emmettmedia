import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	if (request.nextUrl.pathname === '/api/auth/refresh') {
		let cookie = request.cookies.get('refresh_token');
		if (!cookie) {
			return new Response('Unauthorized', { status: 401 });
		}
	}
}
