import {
	ERROR_FILE,
	testSize, testName, testExtension, readFile
} from '../../modules/drop/DropActions.js';
import Drop from './Drop.jsx';
import { connect } from 'react-redux';

function mapStateToProps (state) {
	return {
		link: state.drop.get('link'),
		error: state.drop.get('error'),
		processing: state.drop.get('processing'),
	};
}


function mapDispatchToProps (dispatch) {
	return {
		//TODO: move test in actions !
		onDrop(file) {
			//Test size
			testSize(file)
				.then(() => testName(file))
				.then(() => testExtension(file))
				//Find hash and send it
				.then(() => dispatch(readFile(file)))
				.catch((error) => {
					return dispatch({
						type: ERROR_FILE,
						error: error.message,
					});
				});
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Drop);
