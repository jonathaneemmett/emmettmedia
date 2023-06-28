'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FaBars } from 'react-icons/fa';

const Navbar = () => {
	const [checked, setChecked] = useState(false);

	return (
		<nav className='navbar'>
			<div className='logo'>
				<Link href='/'>Emmettmedia.com</Link>
			</div>
			<ul className='navLinks'>
				<input
					type='checkbox'
					name='checkboxToggle'
					id='checkboxToggle'
					checked={checked}
					onChange={() => setChecked(!checked)}
				/>
				<label htmlFor='checkboxToggle' className='hamburger'></label>
				<FaBars
					className='hamburger'
					onClick={() => setChecked(!checked)}
				/>
				<div className='menu'>
					<li>
						<Link
							href='/articles'
							onClick={() => setChecked(false)}>
							Articles
						</Link>
					</li>
					<li>
						<Link href='/about' onClick={() => setChecked(false)}>
							About
						</Link>
					</li>
					<li>
						<Link href='/contact' onClick={() => setChecked(false)}>
							Contact
						</Link>
					</li>
					<li>
						<Link
							href='/auth/login'
							onClick={() => setChecked(false)}>
							Login
						</Link>
					</li>
				</div>
			</ul>
		</nav>
	);
};

export default Navbar;
