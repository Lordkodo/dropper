const request = require('superagent');

const DOMAIN = 'http://35.198.150.10:8000';
const URL = {
	'SEND': '/api/file/',
}

export function sendData(data, name, md5) {
	return request
		.post(DOMAIN + URL.SEND)
		.send({
			"name": name,
			"file": data,
			"md5": md5,
		})
		.then((result) =>  JSON.parse(result.text))
		.catch((res) => {
			throw new Error(JSON.parse(res.response.text).error);
		})
}

export function getData(hash) {
	return request
		.get(DOMAIN + URL.SEND + hash)
		.catch((error) => error)
}
