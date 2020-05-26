const utils = require('../utils');



// **************************************
function getFile(file) {
	var resp;

	utils.mockAJAXRequest(file, function (text) {
		if (!resp) resp = text;
		else resp(text);
	});

	return function th(cb) {
		if (resp) cb(resp);
		else resp = cb;
	};
}

// request all files at once in "parallel"
var th1 = getFile("file1");
var th2 = getFile("file2");
var th3 = getFile("file3");

th1((text) => {
	utils.output(text);
	th2((text) => {
		utils.output(text);
		th3((text) => {
			utils.output(text);
			utils.output("Complete!");
		});
	});
});