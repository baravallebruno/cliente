import React, { useContext, useState, useEffect } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {
	// Extraer si un proyecto esta activo
	const proyectosContext = useContext(proyectoContext);
	const { proyectoactual } = proyectosContext;

	//Obtener la funcion del context de tareas
	const tareasContext = useContext(tareaContext);
	const {
		errortarea,
		tareaseleccionada,
		agregarTarea,
		validarTarea,
		actualizarTarea,
		limpiarTarea
	} = tareasContext;

	// Effect que detecta si hay una tarea seleccionada
	useEffect(() => {
		if (tareaseleccionada !== null) {
			setTarea(tareaseleccionada);
		} else {
			setTarea({
				nombre: ''
			});
		}
	}, [tareaseleccionada]);

	//State del formulario
	const [tarea, setTarea] = useState({
		nombre: ''
	});

	//Extraer el nombre del proyecto
	const { nombre } = tarea;

	// Si no hay proyecto seleccionado
	if (!proyectoactual) return null;

	// Array destructuring para obtener el proyecto actual
	const [proyectseleccionado] = proyectoactual;

	//Leer los valores del formulario
	const handleChange = e => {
		setTarea({
			...tarea,
			[e.target.name]: e.target.value
		});
	};

	const onSubmit = e => {
		e.preventDefault();

		//Validar
		if (nombre.trim() === '') {
			validarTarea();
			return;
		}

		// Si es edicion o es tarea nueva
		if (tareaseleccionada === null) {
			//Agregar nueva tarea al state de tareas
			tarea.proyecto = proyectseleccionado._id;
			agregarTarea(tarea);
		} else {
			//actualizar tarea existente
			actualizarTarea(tarea);

			//elimina tareaseleccionada del state
			limpiarTarea();
		}

		//Reiniciar el form
		setTarea({
			nombre: ''
		});
	};

	return (
		<div className='formulario sombra'>
			<form className='form-group' onSubmit={onSubmit}>
				<input
					type='text'
					className='input-text input-tarea'
					placeholder='Nombre tarea'
					name='nombre'
					value={nombre}
					onChange={handleChange}
				/>

				<input
					type='submit'
					className='btn btn-primario btn-submit btn-group'
					value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
				/>
			</form>

			{errortarea ? (
				<p className='mensaje error'>El nombre de la tarea es obligatorio</p>
			) : null}
		</div>
	);
};

export default FormTarea;
