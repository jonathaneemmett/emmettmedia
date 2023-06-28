'use client';
import React, { FormEvent, useState } from 'react';

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	async function submitHandler(e: FormEvent<HTMLElement>) {
		e.preventDefault();

		console.log(email, password);
	}

	return (
		<div className='form-container'>
			<form onSubmit={submitHandler} className='form'>
				<h2>Login</h2>
				<div className='form-group'>
					<label htmlFor='email' className='visually-hidden'>
						Email
					</label>
					<input
						type='text'
						className='form-control'
						placeholder='Email...'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='password' className='visually-hidden'>
						Password
					</label>
					<input
						type='password'
						className='form-control'
						placeholder='Password...'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button type='submit' className='btn btn-primary'>
					{' '}
					Login{' '}
				</button>
				<div className='form-nav'>
					<p>
						Don&apos;t have an account?{' '}
						<a href='/auth/register'>Register</a>
					</p>
				</div>
			</form>
		</div>
	);
};

export default LoginPage;
