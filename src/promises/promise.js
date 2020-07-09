const utils = require('../utils');

// **************************************

function getFile(file) {
	return new Promise(function(resolve){
		utils.mockAJAXRequest(file,resolve);
	});
}

var p1 = getFile("url-1");
var p2 = getFile("url-2");
var p3 = getFile("url-3");

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