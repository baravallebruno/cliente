import React, { Fragment, useState, useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {
	// Obtener el state del formulario
	const proyectosContext = useContext(proyectoContext);
	const {
		formulario,
		errorformulario,
		mostrarFormulario,
		agregarProyecto,
		mostrarError
	} = proyectosContext;

	// State para el proyecto
	const [proyecto, setProyecto] = useState({
		nombre: ''
	});

	// Extraer nombre de proyecto
	const { nombre } = proyecto;

	// Lee los contenidos del input
	const onChangeProyecto = e => {
		setProyecto({
			...proyecto,
			[e.target.name]: e.target.value
		});
	};

	// Cuando el usuario envia un proyecto
	const onSubmitProyecto = e => {
		e.preventDefault();

		// Validar el proyecto
		if (nombre === '') {
			mostrarError();
			return;
		}
		// Agregar al state
		agregarProyecto(proyecto);
		// Limpiar formulario
		setProyecto({
			nombre: ''
		});
	};

	const onClickFormulario = () => {
		mostrarFormulario(true);
	};

	return (
		<Fragment>
			{!formulario ? (
				<button
					type='button'
					className='btn btn-block btn-primario'
					onClick={onClickFormulario}
				>
					Nuevo Proyecto
				</button>
			) : null}

			{formulario ? (
				<form className='formulario-nuevo-proyecto' onSubmit={onSubmitProyecto}>
					<input
						type='text'
						className='input-text'
						placeholder='Nombre proyecto'
						name='nombre'
						value={nombre}
						onChange={onChangeProyecto}
					/>
					<input
						type='submit'
						className='btn btn-block btn-primario'
						value='Agregar Proyecto'
					/>
				</form>
			) : null}

			{errorformulario ? (
				<p className='mensaje error'>El nombre del Proyecto es obligatorio</p>
			) : null}
		</Fragment>
	);
};

export default NuevoProyecto;
