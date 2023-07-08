import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export function POST(request: Request) {
	const cookieStore = cookies();
	const refreshToken = cookieStore.get('refreshToken');

	if (!refreshToken) {
		return NextResponse.json(
			{
				message: 'Unauthorized',
			},
			{
				status: 401,
			},
		);
	}

	try {
		cookieStore.set('refreshToken', '', {
			expires: new Date(0),
		});

		return new Response('', {
			status: 204,
			headers: {
				'Set-Cookie': cookieStore.toString(),
			},
		});
	} catch (err) {
		return NextResponse.json(
			{
				message: 'Unauthorized',
			},
			{
				status: 401,
			},
		);
	}
}
