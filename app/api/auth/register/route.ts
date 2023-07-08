import { NextResponse } from 'next/server';
import prisma from '@/app/config/dbConfig';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { MIN_AGE, MAX_AGE } from '@/app/config/constants';

export async function POST(request: Request) {
	const body = await request.json();
	const { name, email, password } = body;

	// Simple Validation
	if (!name || !email || !password) {
		return NextResponse.json(
			{ message: 'Please fill all fields', status: 'error' },
			{ status: 400 },
		);
	}

	// Check for existing user
	const user = await prisma.user.findUnique({
		where: { email },
	});
	if (user) {
		return NextResponse.json(
			{ message: 'That email is already in use.', status: 'error' },
			{ status: 400 },
		);
	}

	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);

	// Create user
	const newUser = await prisma.user.create({
		data: {
			name,
			email,
			password: hash,
		},
	});

	// Sign token
	const jwt_secret = process.env.JWT_SECRET || '';
	const refresh_token_secret = process.env.REFRESH_TOKEN_SECRET || '';

	const token = jwt.sign({ id: newUser.id }, jwt_secret, {
		expiresIn: MIN_AGE,
	});

	const refresh_token = jwt.sign({ id: newUser.id }, refresh_token_secret, {
		expiresIn: MAX_AGE,
	});

	// Create cookie
	const seralized = cookie.serialize('refresh_token', refresh_token, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== 'development',
		sameSite: 'strict',
		maxAge: MAX_AGE,
		path: '/',
	});

	// Send Response
	const payload = {
		message: 'Registration successful',
		user: {
			id: newUser.id,
			name: newUser.name,
			email: newUser.email,
		},
		token,
	};

	return new Response(JSON.stringify(payload), {
		status: 200,
		headers: {
			'Set-Cookie': seralized,
		},
	});
}
