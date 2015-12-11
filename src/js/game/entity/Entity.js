let geom = require('engine/util/geom');
let Container = require('game/entity/Container');

module.exports = class Entity extends Container {
    constructor(game, X, Y) {
        super(game);
        this.$POSITION = new geom.Point();
        this.setXY(X, Y);
    }

    setXY(X, Y) {
        this.$POSITION.set(X, Y);
        this.position.x = X * this.game.c.SIZE;
        this.position.y = Y * this.game.c.SIZE;
    }

    get X() {
        return this.$POSITION.x;
    }

    get Y() {
        return this.$POSITION.y;
    }
};