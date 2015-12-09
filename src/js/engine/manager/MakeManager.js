let PIXI = require('pixi.js');

class MakeManager {
    constructor(game) {
        this.game = game;
    }

    graphics() {
        var obj = new PIXI.Graphics();
        obj.game = this.game;
        return obj;
    }

    sprite(texture) {
        var obj = new PIXI.Sprite(texture);
        obj.game = this.game;
        return obj;
    }

    text(text, style) {
        var obj = new PIXI.Text(text, style);
        obj.game = this.game;
        return obj;
    }

    destroy() {
        this.game = void 0;
    }
}

module.exports = MakeManager;