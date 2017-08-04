import {
	DROPING_FILE,
	DROP_SUCCESS,
	RESET_FILE,
	ERROR_FILE,
	DROP_FAIL,
} from './DropActions';
import { Map } from 'immutable';

const defaultState = Map({
	data: null,
	processing: false,
	error: '',
	link: '',
});

export default function drop(state = defaultState, action) {
	switch (action.type) {
		case DROPING_FILE:
			return state.merge({
				data: action.data,
				processing: true,
				error: '',
			});

		case RESET_FILE:
			return state.set('data', null);

		case ERROR_FILE:
			return state.merge({
				data: null,
				error: action.error,
			});

		case DROP_SUCCESS:
			return state.merge({
				link: action.link,
				processing: false,
			});

		case DROP_FAIL:
			return state.merge({
				error: action.error,
				processing: false,
			});

		default:
			return state;
	}
}
