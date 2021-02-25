import { CAMBIAR_MODO } from '../../types';

export default (state, action) => {
	switch (action.type) {
		case CAMBIAR_MODO:
			return {
				...state,
				isDark: action.payload
			};

		default:
			return state;
	}
};
