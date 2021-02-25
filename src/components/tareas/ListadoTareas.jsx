import React, { Fragment, useContext } from 'react';
import Tarea from './Tarea';
import EmptyTareas from './EmptyTareas';
import EmptyProyectos from '../proyectos/EmptyProyectos';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const ListadoTareas = () => {
	// Obtener el state de proyecto
	const proyectosContext = useContext(proyectoContext);
	const { proyectoactual, proyectos } = proyectosContext;

	//Obtener las tareas del proyecto
	const tareasContext = useContext(tareaContext);
	const { tareasproyecto } = tareasContext;

	// Si no hay proyectos creados
	if (proyectos.length === 0) return <EmptyProyectos />;

	// Si no hay proyecto seleccionado
	if (!proyectoactual) return <EmptyTareas />;

	// Array destructuring para obtener el proyecto actual
	const [proyectoseleccionado] = proyectoactual;

	return (
		<Fragment>
			<h2>{proyectoseleccionado.nombre}</h2>
			<ul className='listado-tareas overflow'>
				{tareasproyecto.length === 0 ? (
					<li className='tareas'>
						<p>No hay tareas</p>
					</li>
				) : (
					<TransitionGroup>
						{tareasproyecto.map((tarea, index) => (
							<CSSTransition key={index} timeout={300} classNames='tarea'>
								<Tarea tarea={tarea} />
							</CSSTransition>
						))}
					</TransitionGroup>
				)}
			</ul>
		</Fragment>
	);
};

export default ListadoTareas;
