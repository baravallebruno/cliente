import React from 'react';
import img from '../../assets/img/1.svg';

const EmptyTareas = () => {
	return (
		<div className='d-flex'>
			<img className='img-centrada' src={img} alt='' />
			<h1>Seleccionemos un proyecto para empezar</h1>
		</div>
	);
};

export default EmptyTareas;
