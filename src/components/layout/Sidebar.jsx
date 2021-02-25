import React, { useContext } from 'react';
import NuevoProyecto from '../proyectos/NuevoProyecto';
import ListadoProyectos from '../proyectos/ListadoProyectos';
import DarkLogo from '../../assets/img/logo-oscuro.svg';
import LightLogo from '../../assets/img/logo-claro.svg';
import modeContext from '../../context/mode/modeContext';

const Sidebar = () => {
	// Obtener el state de modo
	const modosContext = useContext(modeContext);
	const { isDark } = modosContext;

	return (
		<aside>
			<div className='cabecera'>
				<h1>
					<img
						src={isDark ? LightLogo : DarkLogo}
						alt='Logo'
						className='logo'
					/>
				</h1>
			</div>

			<NuevoProyecto />

			<div className='proyectos'>
				<ListadoProyectos />
			</div>
		</aside>
	);
};

export default Sidebar;
