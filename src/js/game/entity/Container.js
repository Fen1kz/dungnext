let PIXI = require('pixi.js');

module.exports = class Container extends PIXI.Container {
    constructor(game) {
        super();
        this.game = game;
        this.$add = this.game.makeAdd(this);
    }

    get add() {
        return this.$add;
    }

    destroy() {
        super.destroy(true);
        this.game = null;
    }
};