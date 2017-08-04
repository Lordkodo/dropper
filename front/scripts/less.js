const Path = require('path');
const fs = require('fs-extra');
const childProcess = require('child_process');

// function translate(path) {
// 	let stat;
// 	let file;
//
// 	fs.readdirSync(path).map((file) => {
// 		file = Path.resolve(path + '/' + file);
// 		if (fs.lstatSync(file).isDirectory()) {
// 			translate(file);
// 		} else if (Path.basename(file).indexOf('.less') !== -1) {
// 			const newName = Path.basename(file).split('.')[0] + '.css';
// 			const newPath = Path.resolve(path, newName);
//
// 			childProcess.exec('lessc ' + file + ' ' + newPath, (error, stdout, stderr) => {
// 				if (error) {
// 					console.log('Less script error: ', error);
// 				}
// 			});
// 		}
// 	})
// }
//
// translate(Path.resolve(__dirname + '/../src/'));

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
