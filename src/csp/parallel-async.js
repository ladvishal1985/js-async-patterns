const csp = require("js-csp");
const utils = require('../utils');

// **************************************

function getFile(url, cb) {
    utils.mockAJAXRequest(url, (text) => {
        return cb(url, text);
    });
}



// Utility to that executes parallel requests and gives back the results.
const parallel = (requests, cb) => {
    const ch = csp.chan();
    let data = [];
    requests.forEach((request) => {
        data.push(request.url);
        request.req((data) => {
            csp.putAsync(ch, data);
        })
    })
    csp.go(function* () {
        for (let i = 0; i < requests.length; i++) {
            const val = yield csp.take(ch);
            if (val === csp.CLOSED) {
                utils.output('Something went wrong')
            }
            data[data.indexOf(val.url)] = val.response
        }
        ch.close();
        cb(null, data)
    })

}

const printResults = (err, allResult) => {
    allResult.forEach((result) => {
        utils.output(result)
    })

    utils.output('Complete!');
}

const allRequests = [
    { url: 'url-1', req: (next) => getFile("url-1", (url, response) => next({ url, response })) },
    { url: 'url-2', req: (next) => getFile("url-2", (url, response) => next({ url, response })) },
    { url: 'url-3', req: (next) => getFile("url-3", (url, response) => next({ url, response })) }
]


parallel(allRequests, printResults)




