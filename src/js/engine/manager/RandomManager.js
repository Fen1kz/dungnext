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

    // Park-Miller x^2
    PM2between(min, max) {
        return min + Math.floor(this.get() * this.get() * (max - min + 1));
    }
    // Park-Miller x^3
    PM3between(min, max) {
        return min + Math.floor(this.get() * this.get() * this.get() * (max - min + 1));
    }
}

module.exports = Random;