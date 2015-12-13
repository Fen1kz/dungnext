let PIXI = require('pixi.js');

module.exports = class Container extends PIXI.Container {
    constructor(game) {
        super();
        this.game = game;
        this.add = this.game.makeAdd(this);
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
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
        this.debugGfx = this.add.graphics();
        this.debugGfx.cacheAsBitMap = true;
        this.debugDraw();
    }

    destroy() {
        super.destroy(true);
        this.game = null;
    }
};