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

        for (let X = 0; X < this.WIDTH; ++X) {
            for (let Y = 0; Y < this.HEIGHT; ++Y) {
                let cell = new Cell(this, this.X + X, this.Y + Y);
                this.cells.put(this.X + X, this.Y + Y, cell);
            }
        }

        this.cells.forEach((cell) => {
            this.addChild(cell);
            cell.draw();
        })
    }


    setXY(X, Y) {
        super.setXY(X, Y);
        this.position.x = X * this.game.c.SIZE * this.game.c.CHUNK_SIZE;
        this.position.y = Y * this.game.c.SIZE * this.game.c.CHUNK_SIZE;
    }
};