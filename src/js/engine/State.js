let PIXI = require('pixi.js');
let Promise = require('bluebird');

class State {
    constructor(game) {
        this.game = game;
    }

    preload() {

    }

    $preCreate() {
        this.stage = new PIXI.Container();
    }

    create() {

    }

    update() {

    }

    render() {

    }
}

module.exports = State;