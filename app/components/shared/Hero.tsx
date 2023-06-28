import React from 'react';
import Image from 'next/image';

const Hero = () => {
	return (
		<div className='hero'>
			<div className='avatar'>
				<Image
					src='/images/avatar.jpeg'
					alt='Emmett Media'
					width={200}
					height={200}
				/>
			</div>
			<h1>Welcome, I&apos;m Jonathan E. Emmett</h1>
			<p>
				I&apos;m a software engineer with a love of Javascript, nature,
				and running.
			</p>
		</div>
	);
};

export default Hero;
