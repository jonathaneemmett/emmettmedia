import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import prisma from '@/app/config/dbConfig';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { MAX_AGE, MIN_AGE } from '@/app/config/constants';

export async function POST(request: Request) {
	const body = await request.json();
	const { email, password } = body;
	const cookieStore = cookies();
	const oldRefreshToken = cookieStore.get('refresh_token');

	// Simple Validation
	if (!email || !password) {
		return NextResponse.json(
			{ message: 'Please fill all fields', status: 'error' },
			{ status: 400 },
		);
	}

	// Check for existing user
	const user = await prisma.user.findUnique({
		where: { email },
	});

	if (user && (await bcrypt.compare(user.password, password))) {
		// Delete old refresh token
		let refreshTokenArray = oldRefreshToken
			? user.refreshTokens.filter(
					(token: string) => token !== oldRefreshToken.toString(),
			  )
			: user.refreshTokens;

		if (oldRefreshToken) {
			const ifExists = user.refreshTokens.find(
				(token: string) => token === oldRefreshToken.toString(),
			);

			/* if the token doesn't exist in the database its already
			 * been used so this is a potential hacking attempt, so
			 * we delete all the refresh tokens.
			 */
			if (!ifExists) {
				user.refreshTokens = [];
				await prisma.user.update({
					where: { id: user.id },
					data: user,
				});
				cookieStore.set('refreshToken', '', {
					expires: new Date(0),
				});

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

		// Sign token
		const jwt_secret = process.env.JWT_SECRET || '';
		const refresh_token_secret = process.env.REFRESH_TOKEN_SECRET || '';

		const token = jwt.sign({ id: user.id }, jwt_secret, {
			expiresIn: MIN_AGE,
		});

		const refresh_token = jwt.sign({ id: user.id }, refresh_token_secret, {
			expiresIn: MAX_AGE,
		});

		// Add refresh token to database
		user.refreshTokens = [...refreshTokenArray, refresh_token];
		await prisma.user.update({
			where: { id: user.id },
			data: user,
		});

		// Create cookie
		const seralized = cookie.serialize('refresh_token', refresh_token, {
			httpOnly: true,
			secure: process.env.NODE_ENV !== 'development',
			sameSite: 'strict',
			maxAge: MIN_AGE,
			path: '/',
		});

		// Send Response
		const payload = {
			message: 'Login successful',
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
			},
			token,
		};

		return new Response(JSON.stringify(payload), {
			status: 200,
			headers: {
				'Set-Cookie': seralized,
			},
		});
	} else {
		return NextResponse.json(
			{ message: 'Invalid credentials', status: 'error' },
			{ status: 401 },
		);
	}
}
