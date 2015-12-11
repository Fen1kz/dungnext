let CompositeMap = require('game/util/CompositeMap');
let Entity = require('game/entity/Entity');

let numbersStyle = {
    font: '8px Arial'
};

module.exports = class Cell extends Entity {
    constructor(chunk, X, Y) {
        super(chunk.game, X, Y);
        this.chunk = chunk;

        this.cells = new CompositeMap();
        this.borders = new CompositeMap();

        this.graphics = this.add.graphics();
        this.cacheAsBitmap = true;
    }

    draw() {
        if (this.text) this.text.destroy();

        //if (this.numbers) this.numbers.destroy();
        //this.numbers = this.add.text(`${this.X}:${this.Y}`, numbersStyle);
        //this.numbers.position.set(this.game.c.SIZE * .5 - this.numbers.width * .5, this.game.c.SIZE - 8);

        this.graphics.clear();
        this.graphics.lineStyle(1, 0x0, 0.2);
        this.graphics.drawRect(0, 0, this.game.c.SIZE, this.game.c.SIZE);
        //this.graphics.drawRect(0, 0, this.width, this.height);
        this.graphics.endFill();
        return this;
    }
};