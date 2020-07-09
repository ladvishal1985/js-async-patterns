const utils = require('../utils');



// **************************************
// Our Thunk function
function getFile(file) {
	var resp;

	utils.mockAJAXRequest(file, (text) => {
		if (!resp) resp = text;
		else resp(text);
	});

	return (cb) => {
		if (resp) cb(resp);
		else resp = cb;
	};
}

// request all files at once in "parallel"
var th1 = getFile("url-1");
var th2 = getFile("url-2");
var th3 = getFile("url-3");

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