const utils = require('../utils');

// **************************************

function getFile(file) {
    return new Promise(function (resolve) {
        utils.mockAJAXRequest(file, resolve);
    });
}


function gnRunner(genFn) {
    const itr = genFn();
    function run(args) {
        const result = itr.next(args);
        if (result.done) {
            return result.value;
        } else {
            return Promise.resolve(result.value).then(run)
        }
    }
    return run();
}

function *getAllfiles() {
    var p1 = getFile("file1");
    var p2 = getFile("file2");
    var p3 = getFile("file3");


    utils.output(yield p1)
    utils.output(yield p2)
    utils.output(yield p3)
    utils.output("Complete!");
}

gnRunner(getAllfiles)