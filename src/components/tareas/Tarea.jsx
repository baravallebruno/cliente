import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as moment from 'moment';
import 'moment/locale/es';
import {
	faTrashAlt,
	faEdit,
	faCheck,
	faTimes
} from '@fortawesome/free-solid-svg-icons';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Tarea = ({ tarea }) => {
	// Obtener el state de proyecto
	const proyectosContext = useContext(proyectoContext);
	const { proyectoactual } = proyectosContext;

	//Extraer el proyecto
	const [proyectoseleccionado] = proyectoactual;

	//Obtener la funcion del context de tareas
	const tareasContext = useContext(tareaContext);
	const {
		eliminarTarea,
		obtenerTareas,
		actualizarTarea,
		guardarTareaActual
	} = tareasContext;

	//Funcion que se ejecuta cuando el usuario presiona el btn de eliminar tarea
	const tareaEliminar = id => {
		eliminarTarea(id, proyectoseleccionado._id);
		obtenerTareas(proyectoseleccionado._id);
	};

	//Funcion para cambiar estado de tareas
	const cambiarEstado = tarea => {
		if (tarea.estado) {
			tarea.estado = false;
		} else {
			tarea.estado = true;
		}
		actualizarTarea(tarea);
	};

	//Agrega una tarea actual cuando el usuario desea editarla
	const seleccionarTarea = tarea => {
		guardarTareaActual(tarea);
	};

	const desde = moment(tarea.creado).fromNow();
	return (
		<li className='tarea sombra'>
			<div className='columna'>
				<h3>{tarea.nombre}</h3>
				<p>Creado {desde}</p>
			</div>
			<div className='acciones'>
				<div className='estado'>
					{tarea.estado ? (
						<button
							type='button'
							className='completo'
							onClick={() => cambiarEstado(tarea)}
						>
							Completo <FontAwesomeIcon className='icono' icon={faCheck} />
						</button>
					) : (
						<button
							type='button'
							className='incompleto'
							onClick={() => cambiarEstado(tarea)}
						>
							Incompleto <FontAwesomeIcon className='icono' icon={faTimes} />
						</button>
					)}
				</div>
				<div className='acciones'>
					<button
						type='button'
						className='btn btn-accion'
						onClick={() => seleccionarTarea(tarea)}
					>
						<FontAwesomeIcon icon={faEdit} />
					</button>
					<button
						type='button'
						className='btn btn-secundario'
						onClick={() => tareaEliminar(tarea._id)}
					>
						<FontAwesomeIcon icon={faTrashAlt} />
					</button>
				</div>
			</div>
		</li>
	);
};

export default Tarea;
