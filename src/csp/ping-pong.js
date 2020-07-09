// Very simple ping pong implementation using js-csp

const csp = require("js-csp");
const utils = require('../utils');


const ping = csp.chan();
const pong = csp.chan();
function* player(name, fromTable, toTable) {
    while (true) {
        const ball = yield csp.take(fromTable)
        if (ball === csp.CLOSED) {
            utils.output(`${name}: table's gone`);
            return;
        }
       
        utils.output(`${name === 'ping' ? 'Pong' : 'Ping'} hits ${ball.hits}`);
        
        ball.hits = ball.hits + 1;
        yield csp.timeout(1000);
        yield csp.put(toTable, ball);
        
    }
}

csp.go(function* () {
    csp.go(player, ['ping', pong, ping]);
    csp.go(player, ['pong', ping, pong]);
    yield csp.put(ping, { hits: 0 });
})

