import React from 'react';
import Link from 'next/link';

const Footer = () => {
	return (
		<footer className='footer'>
			<p>
				&copy; {new Date().getFullYear()}{' '}
				<Link href='/'>emmettmedia.com</Link>
			</p>
		</footer>
	);
};

export default Footer;
