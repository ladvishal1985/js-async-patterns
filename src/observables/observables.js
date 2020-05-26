const { Observable, forkJoin, of } = require('rxjs')
const { tap } = require('rxjs/operators')
const utils = require('../utils');
// **************************************

function getFile(file, index) {

    return new Observable((observer) => {
        function success(response) {
            observer.next(response)
            observer.complete();
        }
        return utils.mockAJAXRequest(file, success)

    })
}

var urls = ['url-1', 'url-2', 'url-3'];
var combineAll = function () {
    return forkJoin(
        urls.map((url, index) => {
            return getFile(url, index).pipe(tap(res => res))
        }))
}
combineAll()
    .subscribe(
        val => utils.output(val),
        err => utils.output('Error:' + err),
        () => utils.output("Completed!")
    )
