const utils = require('../utils');

function getFile(file) {
	return new Promise(function (resolve) {
		utils.mockAJAXRequest(file, resolve);
	});
}

["url-1", "url-2", "url-3"]
	.map(getFile)
	.reduce((chain, pr) => {
		return chain.then(() => {
			return pr
		}).then(utils.output)
	}, Promise.resolve())
	.then(() => {
		utils.output("Complete!")
	})
