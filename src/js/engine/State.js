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

    loop(checkFn, loopFn, options = {}) {
        let index = 0;
        let $loopFn = (options.delay > 0
            ? (data) => Promise.method(loopFn)(data).delay(options.delay)
            : Promise.method(loopFn));

        let $loop = (resultOuter) => {
            return $loopFn(resultOuter)
                .then((resultInner) => {
                    index += 1;
                    return (checkFn(resultInner, index)
                            ? $loop(resultInner)
                            : Promise.resolve(null)
                    )
                });
        };

        return $loop();
    }

    counter(max) {
        return (_, index) => {
            return index < max;
        }
    }
}

module.exports = State;