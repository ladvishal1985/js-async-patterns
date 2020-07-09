const { chan, go, put, take, timeout } = require('js-csp');


/*
 * Multiple processes running simultaneously, sharing a single channel. Three of the processes sleep for 1000 ms
 * and then take a value from the channel before repeating. the fourth process i.e. producer quickly puts the 
 * generated value.
 */
const ch = chan();

function* consumer(consumeName) {
    while (true) {
        yield timeout(1000)
        if(ch === csp.CLOSED){
            console.log('No more values to take!')
        }
        const value = yield take(ch);
        console.log(`${consumeName} took the ${value}`);
    }
}

go(function* producer() {
    let current = 0;
    let next = 1;
    let fib = 1;
    while (fib < 100) {
        yield put(ch, fib)
        fib = current + next;
        current = next;
        next = fib
       
    }
    ch.close();
});

go(consumer, ['Consumer 1']);
go(consumer, ['Consumer 2']);
go(consumer, ['Consumer 3']);
