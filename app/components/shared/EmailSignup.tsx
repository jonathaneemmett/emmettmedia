import React from 'react';

const EmailSignup = () => {
	return (
		<div className='signup-container'>
			<form className='signup-form'>
				<input
					type='email'
					className='signup-input'
					placeholder='Email address'
					disabled
				/>
				<button type='submit' className='signup-button'>
					Sign up
				</button>
			</form>
		</div>
	);
};

export default EmailSignup;
