import React, { useEffect, useContext } from 'react';
import Toggle from 'react-toggle';
import modeContext from '../../context/mode/modeContext';
import 'react-toggle/style.css';
import '../../index.css';

const DarkToggle = () => {
	// Obtener el state de modo
	const modosContext = useContext(modeContext);
	const { isDark, setIsDark } = modosContext;

	const DARK_CLASS = 'dark';

	useEffect(() => {
		if (isDark) {
			document.documentElement.classList.add(DARK_CLASS);
		} else {
			document.documentElement.classList.remove(DARK_CLASS);
		}
	}, [isDark]);

	return (
		<Toggle
			className='DarkToggle'
			checked={isDark}
			onChange={e => setIsDark(e.target.checked)}
			icons={{
				checked: '🌙',
				unchecked: '🔆'
			}}
			aria-label='Dark mode'
		/>
	);
};

export default DarkToggle;
