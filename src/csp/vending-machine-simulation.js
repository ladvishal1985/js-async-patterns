const { channel, put, take } = require('@f5io/csp');
const { prompt } = require('enquirer');
const utils = require('../utils');

const VendingMachine = (function (stock) {

  return {
    serveCustomer: async function (coinChan, chocChan) {
      while (true) {
        console.log("Waiting for customer to insert coin...");
        await take(coinChan);
        console.log("Coin inserted!");

        console.log("Waiting for customer to retrieve candy...");
        await put(chocChan, 'chocolate');
        console.log("Candy retrieved!");
      }
    },

    insertCoin: async function (coinChan) {
      await put(coinChan, 'coin');
    },

    dispenseChocolate: async function (chocChan) {
      await take(chocChan)
    },
    init: function () {
      const chocChan = channel();
      const coinChan = channel();
      this.serveCustomer(coinChan, chocChan)
      this.insertCoin(coinChan);
      this.dispenseChocolate(chocChan)
    }
  }

})()


VendingMachine.init();
