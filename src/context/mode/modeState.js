import React, { useReducer } from 'react';
import modeContext from './modeContext';
import modeReducer from './modeReducer';
import { useMediaQuery } from 'react-responsive';

import { CAMBIAR_MODO } from '../../types';

const ModoState = props => {
	const systemPrefersDark = useMediaQuery(
		{
			query: '(prefers-color-scheme: dark)'
		},
		undefined,
		prefersDark => {
			setIsDark(prefersDark);
		}
	);

	const initialState = {
		isDark: systemPrefersDark
	};

	// Dispatch para ejecutar las acciones
	const [state, dispatch] = useReducer(modeReducer, initialState);

	// Funcion para cambiar el modo
	const setIsDark = val => {
		dispatch({
			type: CAMBIAR_MODO,
			payload: val
		});
	};

	return (
		<modeContext.Provider
			value={{
				isDark: state.isDark,
				setIsDark
			}}
		>
			{props.children}
		</modeContext.Provider>
	);
};

export default ModoState;
