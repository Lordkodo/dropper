import { sendData } from './DropClient';
const Promise = require("bluebird");
const md5 = require('md5');

export const DROPING_FILE = 'DROPING_FILE';
export const DROP_SUCCESS = 'DROP_SUCCESS';
export const RESET_FILE = 'RESET_FILE';
export const ERROR_FILE = 'ERROR_FILE';
export const DROP_FAIL = 'DROP_FAIL';

const extensions = ['csv', 'xml', 'lnk'];

export function testSize(file) {
	return new Promise((resolve, reject) => {
		if (file.size <= 0 || file.size > 25000000) {
			return reject(new Error('The size is invalide (' + file.size + 'o)'));
		}
		return resolve();
	});
}

export function testName(file) {
	return new Promise((resolve, reject) => {
		if (file.name.split('.').length < 2) {
			return reject(new Error('This file doesn\t have extension, that\'s a problem'));
		}
		return resolve();
	});
}

export function testExtension(file) {
	return new Promise((resolve, reject) => {
		const name = file.name.split('.');
		const ext = name[name.length - 1];

		if (extensions.indexOf(ext) <= -1) {
			return reject(new Error('This extension is not accepted: \'' + ext + '\'. Only ' + extensions + ' are accepted format.'));
		}
		return resolve();
	});
}

export function readFile(file) {
	return function (dispatch, getState) {
		const reader  = new FileReader();

		reader.addEventListener('load', () => {
			dispatch({
				type: DROPING_FILE,
				data: reader.result,
			});

			sendData(reader.result, file.name, md5(reader.result))
				.then((result) => {
					dispatch({
						type: DROP_SUCCESS,
						link: result.url,
					});
				})
				.catch((error) => {
					dispatch({
						type: DROP_FAIL,
						error: error.message,
					});
				});

		}, false);

		if (file) {
			reader.readAsBinaryString(file);
		}
	};
}
