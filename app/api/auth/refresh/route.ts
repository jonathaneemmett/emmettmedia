import { cookies } from 'next/headers';
import prisma from '@/app/config/dbConfig';

export async function POST(request: Request) {
	// const cookieStore = cookies();
	// const refreshToken = cookieStore.get('refresh_token');
	// if (!refreshToken) {
	// 	return new Response('Unauthorized', { status: 401 });
	// }

	// cookieStore.set('refreshToken', '', {
	// 	expires: new Date(0),
	// });

	// // get the user

	return new Response('ok', { status: 200 });
}
