/* https://www.braveclojure.com/core-async/
 * A simple string transform utility that helps reverse and capitalize the string in sequence.
 * This process is synchronous in nature but assume that if we have asynchronous dependendent task
 * we would use callbacks. CSP pattern can help in writing callback free code 
 */
const csp = require("js-csp");


function* reverse(chan) {
    while (true) {
        if (chan === csp.CLOSED) {
            console.log(`Nothing to reverse`);
            return;
        }
        let input = yield csp.take(chan)
        yield csp.put(chan, input.split("").reverse().join(""));
    }

}

function* upperCase(chan) {
    while (true) {
        if (chan === csp.CLOSED) {
            console.log(`Nothing to Upper case`);
            return;
        }
        let input = yield csp.take(chan)
        yield csp.put(chan, input.toUpperCase());
    }
}

function* output(chan) {
    while (true) {
        if (chan === csp.CLOSED) {
            console.log(`Nothing to Output`);
            return;
        }
        let output = yield csp.take(chan)
        console.log('The transformed String-->' + output);
    }
}



function* stringTransform(inputString) {
    const transformChannel = csp.chan();
    csp.go(reverse, [transformChannel]);
    csp.go(upperCase, [transformChannel]);
    csp.go(output, [transformChannel]);
    yield csp.put(transformChannel, inputString)
    
}
const inputString = `PSC htiw ycnerrucnnoC gniretsaM`
csp.go(stringTransform, [inputString]);

const newInputString = `PSC htiw ycnerrucnnoC gniretsaM`
csp.go(stringTransform, [newInputString]);







