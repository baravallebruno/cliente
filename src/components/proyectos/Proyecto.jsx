import React, { useContext, useState, useEffect } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Proyecto = ({ proyecto }) => {
	// Obtener el state de proyecto
	const proyectosContext = useContext(proyectoContext);
	const { proyectoActual, eliminarProyecto, proyectoactual } = proyectosContext;

	//Obtener la funcion del context de tareas
	const tareasContext = useContext(tareaContext);
	const { obtenerTareas } = tareasContext;

	// Funcion para agregar el proyecto actual
	const seleccionarProyecto = id => {
		proyectoActual(id); //Fijar un proyecto actual
		obtenerTareas(id); //Filtar las tareas cuando se de click
	};

	const onClickEliminar = () => {
		eliminarProyecto(proyecto._id);
	};

	const [active, setActive] = useState(false);

	const proyectoActivo = () => {
		if (proyectoactual) {
			proyecto._id === proyectoactual[0]._id
				? setActive(true)
				: setActive(false);
		}
	};

	useEffect(() => {
		proyectoActivo();
	}, [proyectoactual]);

	return (
		<li className={`proyecto sombra ${active ? 'activo' : ''}`}>
			<button
				type='button'
				className='btn btn-blank'
				onClick={() => seleccionarProyecto(proyecto._id)}
			>
				{proyecto.nombre}
			</button>
			<button
				type='button'
				className='btn btn-secundario'
				onClick={onClickEliminar}
			>
				<FontAwesomeIcon icon={faTrashAlt} />
			</button>
		</li>
	);
};

export default Proyecto;
