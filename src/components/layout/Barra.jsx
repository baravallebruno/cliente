import React, { useContext, useEffect, useState } from 'react';
import DarkToggle from './DarkToggle';
import AuthContext from '../../context/autenticacion/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Barra = () => {
	// Extraer la informacion de autenticacion
	const authContext = useContext(AuthContext);
	const { usuario, usuarioAutenticado, cerrarSesion } = authContext;

	const [show, setShow] = useState(false);

	useEffect(() => {
		usuarioAutenticado();
		// eslint-disable-next-line
	}, []);

	return (
		<header className='app-header'>
			{usuario ? (
				<p className='nombre-usuario'>
					Hola <span>{usuario.nombre}</span>
				</p>
			) : null}

			<nav className='nav-principal'>
				<button
					className='btn btn-blank cerrar-sesion'
					onClick={() => cerrarSesion()}
					onMouseEnter={() => setShow(true)}
					onMouseLeave={() => setShow(false)}
				>
					<span className={show ? 'text-show' : 'no-show'}>Cerrar sesion</span>
					<FontAwesomeIcon className='icono' icon={faSignOutAlt} />
				</button>
				<DarkToggle />
			</nav>
		</header>
	);
};

export default Barra;
