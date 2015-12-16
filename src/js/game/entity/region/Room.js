let geom = require('engine/util/geom');
let Region = require('game/entity/region/Region');

let CompositeMap = require('game/util/CompositeMap');
let CompositeMap2d = require('game/util/CompositeMap2d');

module.exports = class Room extends Region {
    constructor(...args) {
        super(...args);

        this.debugColor = 0x8888FF;
        this.debugInit('r');

        this._position = new geom.Point();

        this.cells = new CompositeMap2d();
    }

    setxy(p) {
        this.setXY(
            Math.floor(p.x / this.game.c.SIZE)
            , Math.floor(p.y / this.game.c.SIZE)
        )
    }

    createRectangle() {
        return new geom.Rectangle(this.X, this.Y, this.WIDTH, this.HEIGHT);
    }

    attach(level) {

    }

    detach() {

    }
};