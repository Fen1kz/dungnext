let seedrandom = require('seedrandom');

class Random {
    constructor(game, seed) {
        this.game = game;
        this.seed = seed;
        this.get = seedrandom(this.seed);
    }

    sample(array = []) {
        return array[Math.floor(this.get() * array.length)];
    }

    between(min, max) {
        return min + Math.floor(this.get() * (max - min + 1));
    }
}

module.exports = Random;