'use strict';

let Entity = require('game/entity/Entity');
let Promise = require('bluebird');

//import {Cell} from 'app/level/tile/cell';
//import {Directions as Dir} from 'app/entities/level/directions';
//import {CompositeMap2d} from 'app/util/composite-map-2d';

module.exports = class Region extends Entity {
    constructor(level, X = 0, Y = 0, WIDTH = 0, HEIGHT = 0) {
        super(level.game, X, Y);
        this.level = level;
        this.debugColor = 0x0;
        let self = this;
        this.WIDTH = WIDTH;
        this.HEIGHT = HEIGHT;
        //this.updateCoords();
    }

    getX() {
        return this.WIDTH * this.game.c.SIZE;
    }

    getY() {
        return this.HEIGHT * this.game.c.SIZE;
    }

    getWidth() {
        return this.WIDTH * this.game.c.SIZE;
    }

    getHeight() {
        return this.HEIGHT * this.game.c.SIZE;
    }

    debugDraw() {
        if (this.debugGfx) {
            this.debugGfx.clear();
            this.debugGfx.lineStyle(2, this.debugColor, .5);
            this.debugGfx.beginFill(this.debugColor, .1);
            this.debugGfx.drawRect(0, 0, this.getWidth(), this.getHeight());
            this.debugGfx.endFill();
        }
    }

    debugInit(debugKey) {
        this.game.input.keyboard.on(debugKey, () => {
            this.debugGfx.visible = !this.debugGfx.visible;
        });
        this.debugGfx = this.game.make.graphics(0, 0);
        this.addChild(this.debugGfx);
        this.debugDraw();
    }
}
