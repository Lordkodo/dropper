const Path = require('path');
const fs = require('fs-extra');
const childProcess = require('child_process');

const chokidar = require('chokidar');

function translate(path) {
	if (Path.basename(path).indexOf('.less') !== -1) {
		const name = path.split('.')[path.split('.').length-2];

		childProcess.exec('lessc ' + name + '.less ' + name + '.css', (error, stdout, stderr) => {
			if (error) {
				console.log('Less script error: ', error);
			}
		});
	}
}

chokidar.watch(Path.resolve(__dirname + '/../src/') )
	.on('add', (path) => {
		translate(path);
	})
	.on('change', (path) => {
		translate(path);
	})
	.on('unlink', (path) => {
		if (Path.basename(path).indexOf('.less') !== -1) {
			const name = path.split('.')[path.split('.').length-2];
			fs.removeSync(name + '.css');
		}
	})
	.on('error', () => {
		console.log('ERROR');
	});
