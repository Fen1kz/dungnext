let _ = require('lodash');
let Promise = require('bluebird');
let PIXI = require('pixi.js');

let geom = require('engine/util/geom');

let Graph = require('game/util/Graph');
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

        let ROOMS_COUNT = 100;
        this.rooms = [];
        this.preRooms = [];

        let delays = [0, 0, 50];

        Promise.try(() => {
        }).bind(this)
            .then(() => {
                let i = 0;
                return this.loop(() => {
                    let p = getRandomPointInCircle(Math.floor(ROOMS_COUNT * .5));
                    //let p = getRandomPointInCircle(40);
                    console.log(p)
                    //let w = this.game.random.between(5, 15);
                    //let h = this.game.random.between(5, 15);
                    //let sq = this.game.random.between(25, 225);
                    //let w = this.game.random.between(5, 15);
                    //let h = sq / w;
                    let w = this.game.random.PM2between(5, 15);
                    let h = this.game.random.PM2between(5, 15);
                    this.preRooms.push(this.level.add.room(p.x, p.y, w, h));
                    return i++ < ROOMS_COUNT;
                }, {delay: delays[0]})
            })
            .then(() => {
                this.preRooms.sort((r1, r2) => {
                    return r1.WIDTH + r1.HEIGHT > r2.WIDTH + r2.HEIGHT ? -1 : 1;
                });
                let wr = [], hr = [], er = [];
                this.preRooms.forEach((r) => {
                    if (r.WIDTH > r.HEIGHT) {
                        wr.push(r)
                    } else if (r.WIDTH < r.HEIGHT) {
                        hr.push(r);
                    } else {
                        er.push(r)
                    }
                });
                console.log(wr.length, er.length, hr.length);
                this.rooms = this.preRooms.slice(0, Math.floor(ROOMS_COUNT * .1));
                this.rooms.forEach((room) => {
                    room.debugColor = 0xFF0000;
                    room.debugDraw();
                });
            })
            .then(() => {
                this.preRooms.map((r) => r._position.copy(r.position));
                return this.loop(() => {
                        let separated = true;
                        this.preRooms.forEach((room1) => {
                            let velocity = new geom.Point();
                            let center1 = room1.createRectangle().createCenter();
                            this.preRooms.forEach((room2) => {
                                if (room1 === room2) return;

                                if (!geom.Rectangle.intersect(room1.createRectangle(), room2.createRectangle())) return;

                                let center2 = room2.createRectangle().createCenter();

                                let diff = center1.clone().sub(center2);

                                let diffLength2 = diff.length2();

                                if (diffLength2 > 0) {
                                    diff.nor();
                                    velocity.add(diff);
                                }
                            });

                            if (velocity.length2() > 0) {
                                separated = false;

                                velocity.nor().mult(4);

                                room1._position.add(velocity);
                                room1.setxy(room1._position);
                            }
                        });
                        return !separated;
                    }
                    , {delay: delays[1]});
                //, {delay: 1});
            })
            .then(() => {
                let vertices = this.rooms.map((r) => ({x: r.x + r.width / 2, y: r.y + r.height / 2}));

                let gfx = this.level.add.graphics();
                let graph = new Graph();

                graph.points = vertices.map(v => new PIXI.Point(v.x, v.y));
                graph.points.forEach((p, i) => p.i = i);

                let st = graph.makeSuperTriangle();

                graph.draw(gfx);
            })
            .catch(console.error.bind(console));
    }

    update() {
    }
};

