const utils = require('../utils');

// **************************************

function getFile(file) {
    return new Promise(function (resolve) {
        utils.mockAJAXRequest(file, resolve);
    });
}

async function getAllfiles() {
    var p1 = getFile("file1");
    var p2 = getFile("file2");
    var p3 = getFile("file3");
    utils.output(await p1)
    utils.output(await p2)
    utils.output(await p3)
}

getAllfiles().then(()=>{
    utils.output("Complete!");
})