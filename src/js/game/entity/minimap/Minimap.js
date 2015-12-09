let Container = require('game/entity/Container');

module.exports = class Minimap extends Container {
    constructor(...args) {
        super(...args);
        this.gfx = this.game.make.graphics();
        this.addChild(this.gfx);

        this.draw();
    }

    draw() {
        this.gfx.clear();
        this.gfx.lineStyle(1, 0x0, 1);
        this.gfx.beginFill(0x0, .1);
        this.gfx.drawRect(0, 0, 300, 300);
        this.gfx.endFill();
    }
};