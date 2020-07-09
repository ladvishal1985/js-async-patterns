const utils = require('../utils');


var responses = {}; //Cache the responses

function getFile(file, cb) {
    return utils.mockAJAXRequest(file, (text) => {
        cb(text);
    });
}

function fileReceived(text) {
    utils.output(text)
}
// request all files at once

getFile("url-1", (result) => {
    fileReceived(result);
    getFile("url-2", (result) => {
        fileReceived(result);
        getFile("url-3", (result) => {
            fileReceived(result);
        })
    })
})


