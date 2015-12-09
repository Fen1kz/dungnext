let Level = require('game/entity/Level');
let Minimap = require('game/entity/minimap/Minimap');

module.exports = class FirstState extends require('engine/State') {
    create() {
        window.game = this.game;

        this.level = new Level(this.game);
        this.stage.addChild(this.level);

        this.game.input.clickable(this.level, true);
        this.game.input.draggable(this.level, true);

        //this.level.mix(require('engine/mixin/entity/clickable'));
        //this.level.on('mouse.click', () => {
        //    console.log('clicked!');
        //});

        //this.level.mix(require('engine/mixin/input/draggable'));
        //this.stage.addChild(new Minimap(this.game));

        let chunk = this.level.$add.chunk(0, 0);

        this.level.$add.chunk(0, 1);
        console.log(this.stage)
    }
};

