import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';
import alertaContext from '../../context/alertas/alertaContext';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const ListadoProyectos = () => {
	// Extraer proyectos de state inicial
	const proyectosContext = useContext(proyectoContext);
	const { mensaje, proyectos, obtenerProyectos } = proyectosContext;

	const alertasContext = useContext(alertaContext);
	const { alerta, mostrarAlerta } = alertasContext;
	// Obtener proyectos cuando carga el componente
	useEffect(() => {
		//Si hay un error
		if (mensaje) {
			mostrarAlerta(mensaje.msg, mensaje.categoria);
		}

		obtenerProyectos();
		//eslint-disable-next-line
	}, []);

	// Revisar si proyectos tiene contenido
	if (proyectos.length === 0) return <p>Aca van listados tus proyectos</p>;

	return (
		<>
			<h2>Tus proyectos</h2>
			<ul>
				{alerta ? (
					<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
				) : null}

				<TransitionGroup className='listado-proyectos overflow'>
					{proyectos.map(proyecto => (
						<CSSTransition
							key={proyecto._id}
							timeout={300}
							classNames='proyecto'
						>
							<Proyecto proyecto={proyecto} />
						</CSSTransition>
					))}
				</TransitionGroup>
			</ul>
		</>
	);
};

export default ListadoProyectos;
