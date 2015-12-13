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

    /*
     * Utils
     * */

    loop(loopFn, options = {}) {
        let $loopFn = (options.delay > 0
            ? () => Promise.method(loopFn)().delay(options.delay)
            : Promise.method(loopFn));

        let $loop = () => $loopFn()
            .then((result) => (result ? $loop() : null));

        return $loop();
    }
}

module.exports = State;