const utils = require('../utils');



function getFile(file) {
	return new Promise(function(resolve){
		utils.mockAJAXRequest(file,resolve);
	});
}

["file1", "file2", "file3"]
	.map(getFile)
	.reduce(function combin(chain, pr) {
		return chain.then(function () {
			return pr
		}).then(utils.output)
	}, Promise.resolve())
	.then(()=>{
		output("Complete!")
	})

