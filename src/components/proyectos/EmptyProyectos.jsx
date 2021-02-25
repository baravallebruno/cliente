import React from 'react';
import img from '../../assets/img/1.svg';

const EmptyProyectos = () => {
	return (
		<div className='d-flex'>
			<img className='img-centrada' src={img} alt='' />
			<h1>Oops... No hay proyectos, comencemos creando uno</h1>
		</div>
	);
};

export default EmptyProyectos;
