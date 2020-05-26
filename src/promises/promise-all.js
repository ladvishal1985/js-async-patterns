
const utils = require('../utils');

function getFile(file) {
	return new Promise(function (resolve) {
		utils.mockAJAXRequest(file, resolve);
	});
}
var p1 = getFile('file1')
var p2 = getFile('file2')
var p3 = getFile('file3')

Promise.all([p1, p2, p3]).then((data) => {
	data.forEach((result) => {
		utils.output(result);
	})

}).then(() => console.log('Complete!'))
