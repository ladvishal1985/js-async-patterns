const { Observable } = require('rxjs')
const { tap, concatMap, flatMap, mergeMap } = require('rxjs/operators')
const utils = require('../utils');
// **************************************

function getFile(file) {

    return new Observable((observer) => {
        function success(response) {
            observer.next(response)
            observer.complete();
        }
        return utils.mockAJAXRequest(file, success)

    })
}

const request1 = getFile('url-1').pipe(tap(res => res));
const request2 = getFile('url-2').pipe(tap(res => res));
const request3 = getFile('url-3').pipe(tap(res => res));
request1.pipe(
    concatMap ((result1) => {
        utils.output(result1)
        return request2
    }),
    concatMap ((result2) => {
        utils.output(result2)
        return request3
    }))
    .subscribe((result3) => {
        utils.output(result3)
    });