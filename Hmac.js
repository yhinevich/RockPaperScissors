const rand = require('csprng');
const crypto = require("crypto");

class
Hmac {
    seed;
    computerChoice;
    constructor(computerChoice) {
        this.computerChoice = computerChoice;
        this.seed = this.generateSeed();
    }

    generateSeed() {
        let seed = rand(256,16);
        return seed;
    }

    generateAndPrintHMAC() {
        console.log("HMAC: " + crypto.createHmac('sha256', this.seed).update(this.computerChoice).digest('hex'));
        return this.seed;
    }
}

module.exports = Hmac;