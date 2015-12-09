let Container = require('game/entity/Container');

let CompositeMap = require('game/util/CompositeMap');
let CompositeMap2d = require('game/util/CompositeMap2d');

let Chunk = require('game/entity/region/Chunk');

class Level extends Container {
    constructor(game) {
        super(game);

        this.cells = new CompositeMap2d();
        this.rooms = new CompositeMap();
        this.chunks = new CompositeMap2d();

        Object.assign(this.$add, {
            chunk: (x, y) => {
                let chunk = new Chunk(this, x, y);
                this.cells.addAll(chunk.cells);
                this.chunks.put(chunk);
                this.addChild(chunk);
                return chunk;
            }
            //, room: (...args) => {
            //    let room = new Room(this, ...args);
            //    this.rooms.put(room);
            //    this.add(room);
            //    return room;
            //}
        });
    }
}

module.exports = Level;