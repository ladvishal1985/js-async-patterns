const utils = require('../utils');

// **************************************

function getFile(file) {
	return new Promise(function(resolve){
		mockAJAXRequest(file,resolve);
	});
}

var p1 = getFile("file1");
var p2 = getFile("file2");
var p3 = getFile("file3");

// Render as each one finishes,
// but only once previous rendering
// is done.
p1
.then(utils.output)
.then(function(){
	return p2;
})
.then(utils.output)
.then(function(){
	return p3;
})
.then(utils.output)
.then(function(){
	utils.output("Complete!");
});