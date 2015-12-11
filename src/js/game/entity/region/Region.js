'use strict';

let Entity = require('game/entity/Entity');
let Promise = require('bluebird');

//import {Cell} from 'app/level/tile/cell';
//import {Directions as Dir} from 'app/entities/level/directions';
//import {CompositeMap2d} from 'app/util/composite-map-2d';

module.exports = class Region extends Entity {
    constructor(game, X = 0, Y = 0, WIDTH = 0, HEIGHT = 0) {
        super(game, X, Y);
        this.debugColor = 0x0;
        let self = this;
        this.WIDTH = WIDTH;
        this.HEIGHT = HEIGHT;
        //this.updateCoords();
    }

    getWidth() {
        return this.WIDTH * this.game.c.SIZE;
    }

    getHeight() {
        return this.HEIGHT * this.game.c.SIZE;
    }
}
