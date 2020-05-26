const utils = require('../utils');

 
var responses = {}; //Cache the responses

function getFile(file) {
	utils.mockAJAXRequest(file, (text) => {
		fileReceived(file, text);
	});
}

function fileReceived(file, text){
	var files = ["url-1", "url-2", "url-3"];
	console.log(file)
	if (!responses[file]) {
		responses[file] = text;
	}
	if(files.length > Object.keys(responses).length) {
		return false
	}
	files.forEach((file) =>{
		utils.output(responses[file]);
	});
	utils.output("Complete!");
}
// request all files at once

getFile("url-1");
getFile("url-2");
getFile("url-3");
