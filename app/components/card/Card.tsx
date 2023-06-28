import React from 'react';

const Card = () => {
	return (
		<div className='card'>
			<div className='card-header'>
				<h2>What is this?</h2>
			</div>
			<div className='card-content'>
				<p>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit.
					Temporibus tenetur natus, impedit, enim quaerat quasi
					excepturi ipsum incidunt magnam atque quas aliquid labore
					eum quo soluta nobis quisquam accusantium quis.
				</p>
			</div>
			<div className='card-footer'>
				<button className='btn btn-primary-outline'>Learn More</button>
			</div>
		</div>
	);
};

export default Card;
