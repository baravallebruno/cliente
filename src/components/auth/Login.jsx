import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import DarkLogo from '../../assets/img/logo-oscuro.svg';

const Login = props => {
	// extraer valores de alertaContext
	const alertaContext = useContext(AlertaContext);
	const { alerta, mostrarAlerta } = alertaContext;

	const authContext = useContext(AuthContext);
	const { mensaje, autenticado, iniciarSesion } = authContext;

	// en caso de password o usuario no exista
	useEffect(() => {
		if (autenticado) {
			props.history.push('/proyectos');
		}

		if (mensaje) {
			mostrarAlerta(mensaje.msg, mensaje.categoria);
		}

		// eslint-disable-next-line
	}, [mensaje, autenticado, props.history]);

	//state para iniciar sesion
	const [usuario, setUsuario] = useState({
		email: '',
		password: ''
	});

	// State para ocultar password
	const [hide, setHide] = useState(false);

	//extraer de usuario
	const { email, password } = usuario;

	const onChange = e => {
		setUsuario({
			...usuario,
			[e.target.name]: e.target.value
		});
	};

	//cuando el usuario quiere iniciar sesion
	const onSubmit = e => {
		e.preventDefault();

		// Validar que no haya campos vacios
		if (email.trim() === '' || password.trim() === '') {
			mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
		}

		// Pasarlo al action
		iniciarSesion({ email, password });
	};

	const toggleHide = () => {
		if (!hide) {
			setHide(true);
		} else {
			setHide(false);
		}
	};

	return (
		<div className='form-usuario'>
			{alerta ? (
				<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
			) : null}
			<div className='contenedor-form sombra-dark'>
				<img src={DarkLogo} alt='Logo' className='logo-inicio' />

				<form onSubmit={onSubmit} autocomplete='off'>
					<div className='campo-form'>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							name='email'
							id='email'
							placeholder='Tu Email'
							value={email}
							onChange={onChange}
						/>
					</div>

					<div className='campo-form'>
						<label htmlFor='password'>Password</label>
						<input
							type={hide ? 'text' : 'password'}
							name='password'
							id='password'
							placeholder='Tu Password'
							value={password}
							onChange={onChange}
						/>
						<button type='button' className='ojo' onClick={toggleHide}>
							<FontAwesomeIcon icon={hide ? faEyeSlash : faEye} />
						</button>
					</div>

					<div className='campo-form'>
						<input
							type='submit'
							className='btn btn-primario btn-block'
							value='Iniciar Sesión'
						/>
					</div>
				</form>

				<Link to='/nueva-cuenta' className='enlace-cuenta'>
					Obtener cuenta
				</Link>
			</div>
		</div>
	);
};

export default Login;
