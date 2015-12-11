let Region = require('game/entity/region/Region');
let Cell = require('game/entity/tile/Cell');

let CompositeMap = require('game/util/CompositeMap');
let CompositeMap2d = require('game/util/CompositeMap2d');

module.exports = class Chunk extends Region {
    constructor(level, x, y) {
        super(level, x, y, level.game.c.CHUNK_SIZE, level.game.c.CHUNK_SIZE);

        this.debugColor = 0x0000FF;
        this.debugInit('c');

        this.cells = new CompositeMap2d();
        this.chunks = new CompositeMap2d();

    }


    setXY(X, Y) {
        super.setXY(X, Y);
        this.position.x = X * this.game.c.SIZE * this.game.c.CHUNK_SIZE;
        this.position.y = Y * this.game.c.SIZE * this.game.c.CHUNK_SIZE;
    }
};