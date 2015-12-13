let PIXI = require('pixi.js');
let geom = require('engine/util/geom');

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
        let getRandomPointInCircle = (R) => {
            let a = 2 * Math.PI * this.game.random.get();
            let u = this.game.random.get() + this.game.random.get();
            let r = (u > 1) ? 2 - u : u;
            return new PIXI.Point(
                Math.floor(r * Math.cos(a) * R)
                , Math.floor(r * Math.sin(a) * R)
            );
        };

        this.level.generate(50, 50);

        this.rooms = [];
        let roomsCount = 50;
        for (let rn = 0; rn < roomsCount; ++rn) {
            let p = getRandomPointInCircle(20);
            //console.log(p.x, p.y)
            this.rooms.push(this.level.add.room(p.x
                , p.y
                , this.game.random.between(5, 15)
                , this.game.random.between(5, 15)));
        }

        this.rooms.map((r) => r._position.copy(r.position));

        let separateRoomsStep = () => {
            let separated = true;
            this.rooms.forEach((room1) => {
                let velocity = new geom.Point();
                let center1 = room1.createRectangle().createCenter();
                this.rooms.forEach((room2) => {
                    if (room1 === room2) return;

                    if (!geom.Rectangle.intersect(room1.createRectangle(), room2.createRectangle())) return;

                    let center2 = room2.createRectangle().createCenter();

                    let diff = center1.clone().sub(center2);

                    let diffLength2 = diff.length2();

                    if (diffLength2 > 0) {
                        //diff.nor().mult(5);
                        velocity.add(diff);
                    }
                });

                if (velocity.length2() > 0) {
                    separated = false;

                    //velocity.nor();

                    room1._position.add(velocity);
                    room1.setxy(room1._position);
                }
            });
            console.log('separate room step!', separated);
            return separated;
        };

        let doSeparateRoomsStep = () => {
            this.game.once('state.update', () => {
                if (!separateRoomsStep()) doSeparateRoomsStep();
            });
        };
        doSeparateRoomsStep();
    }

    update() {
        //this.rooms[0]._position.x += .1;
        //this.rooms[0].moveTo();
    }
};

