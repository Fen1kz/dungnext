let PIXI = require('pixi.js');
let Container = require('game/entity/Container');

module.exports = class Entity extends Container {
    constructor(game, X, Y) {
        super(game);
        this.POS = new PIXI.Point();
        this.setXY(X, Y);
    }

    setXY(X, Y) {
        this.POS.set(X, Y);
        this.position.x = X * this.game.c.SIZE;
        this.position.y = Y * this.game.c.SIZE;
    }

    get X() {
        return this.POS.x;
    }

    get Y() {
        return this.POS.y;
    }
};