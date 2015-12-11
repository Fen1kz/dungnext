let PIXI = require('pixi.js');
let geom = require('engine/util/geom');

module.exports = class extends require('engine/State') {
    create() {
        window.game = this.game;

        console.log('stage2');
    }

    update() {
        //this.rooms[0]._position.x += .1;
        //this.rooms[0].moveTo();
    }
};

