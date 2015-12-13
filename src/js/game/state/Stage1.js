let Promise = require('bluebird');
let PIXI = require('pixi.js');
let geom = require('engine/util/geom');

let Level = require('game/entity/Level');
let Minimap = require('game/entity/minimap/Minimap');

module.exports = class FirstState extends require('engine/State') {
    create() {
        window.state = this;
        window.game = this.game;

        this.level = new Level(this.game);
        this.stage.addChild(this.level);

        this.game.input.clickable(this.level, true);
        this.game.input.draggable(this.level, true);

        let getRandomPointInCircle = (R) => {
            let a = 2 * Math.PI * this.game.random.get();
            let u = this.game.random.get() + this.game.random.get();
            let r = (u > 1) ? 2 - u : u;
            return new PIXI.Point(
                Math.floor(r * Math.cos(a) * R)
                , Math.floor(r * Math.sin(a) * R)
            );
        };

        this.rooms = [];
        let roomsCount = 50;

        Promise.try(() => {
        }).bind(this)
            .then(() => {
                let i = 0;
                return this.loop(() => {
                    let p = getRandomPointInCircle(20);
                    this.rooms.push(this.level.add.room(p.x
                        , p.y
                        , this.game.random.PM2between(3, 20)
                        , this.game.random.PM2between(3, 20)));
                    return i++ < roomsCount;
                }, {delay: 50})
            })
            .then(() => {
                this.rooms.map((r) => r._position.copy(r.position));
                return this.loop(() => {
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
                        return !separated;
                    }
                    , {delay: 50});
            })
            .catch(console.error.bind(console));
    }

    update() {
    }
};

