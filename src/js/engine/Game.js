let PIXI = require('pixi.js');

class DnextGame extends PIXI.utils.EventEmitter {
    constructor(width, height, options) {
        super();
        this.width = width;
        this.height = height;
        this.renderer = new PIXI.WebGLRenderer(this.width, this.height, options);
        //this.renderer = new PIXI.CanvasRenderer(400, 300, {backgroundColor: 0x1099bb});
        this.state = new (require('engine/manager/StateManager'))(this);
        this.input = new (require('engine/manager/InputManager'))(this);
        this.random = new (require('engine/manager/RandomManager'))(this, options.seed);

        this.make = new (require('engine/manager/MakeManager'))(this);
        this.makeAdd = (container) => {
            return ['graphics', 'sprite', 'text'].reduce((result, property) => {
                result[property] = (...args) => {
                    let obj = this.make[property](...args);
                    container.addChild(obj);
                    return obj;
                };
                return result;
            }, {});
        };


        PIXI.RESOLUTION = 2;
        this.c = {
            SIZE: 20
            , CHUNK_SIZE: 24
        }
    }

    load(name, url) {
        url = url || name;
        this.loaders.Loader.add(name, url)
    }

    loop() {
        PIXI.ticker.shared.add((time) => {
            this.state.current.update(time);

            this.renderer.render(this.state.current.stage);
        });
    }

    destroy() {
        super.destroy();
        ['state', 'input'].forEach((property) => {
            this[property].destroy();
            this[property] = void 0;
        });
    }
}

module.exports = DnextGame;