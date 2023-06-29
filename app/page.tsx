'use client';
import Card from './components/card/Card';
import EmailSignup from './components/shared/EmailSignup';
import Hero from './components/shared/Hero';

export default function Home() {
	return (
		<>
			<Hero />
			<EmailSignup />
			<div className='row'>
				<div className='col'>
					<Card />
				</div>
				<div className='col'>
					<Card />
				</div>
				<div className='col'>
					<Card />
				</div>
			</div>
		</>
	);
}
