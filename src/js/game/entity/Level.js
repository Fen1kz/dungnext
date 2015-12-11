let Container = require('game/entity/Container');

let CompositeMap = require('game/util/CompositeMap');
let CompositeMap2d = require('game/util/CompositeMap2d');

let Cell = require('game/entity/tile/Cell');
let Room = require('game/entity/region/Room');

class Level extends Container {
    constructor(game) {
        super(game);

        this.cells = new CompositeMap2d();
        this.rooms = [];

        this.x = this.game.width / 3;
        this.y = this.game.height / 2;

        //this.chunks = new CompositeMap2d();

        Object.assign(this.add, {
            room: (...args) => {
                let room = new Room(this.game, ...args);
                this.rooms.push(room);
                this.addChild(room);
                return room;
            }
        });
    }

    generate(WIDTH, HEIGHT) {
        let add = (cell, dir, another) => {
            if (another) cell.cells(dir, another);
        };

        this.WIDTH = WIDTH;
        this.HEIGHT = HEIGHT;

        for (let X = 0; X < this.WIDTH; ++X) {
            for (let Y = 0; Y < this.HEIGHT; ++Y) {
                let cell = new Cell(this, X, Y);
                this.cells.put(X, Y, cell);
            }
        }

        this.cells.forEach((cell) => {
            //add(cell, Dir.N, this.cells.get(cell.X, cell.Y - 1));
            //add(cell, Dir.E, this.cells.get(cell.X + 1, cell.Y));
            //add(cell, Dir.S, this.cells.get(cell.X, cell.Y + 1));
            //add(cell, Dir.W, this.cells.get(cell.X - 1, cell.Y));
        });

        this.cells.forEach((cell) => {
            this.addChild(cell);
            cell.draw();
        });
    }
}

module.exports = Level;