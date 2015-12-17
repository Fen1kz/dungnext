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
                let vi = 0;
                return this.loop(() => {
                    //console.log(v);
                    graph.add(vertices[vi]);
                    graph.draw(gfx);
                    return ++vi < vertices.length;
                //}, {delay: delays[2]});
                }, {delay: 1100});
                //graph.add();

                //let triangles = Delaunay.triangulate(vertices);
                //
                //let sides = [];
                //for (let i = triangles.length; i;) {
                //    let p1 = vertices[triangles[--i]];
                //    let p2 = vertices[triangles[i - 1]];
                //    if (!p2) break;
                //    let so = sides.some((side) =>
                //        side.x1 == p1[0] && side.x2 == p2[0] && side.y1 == p1[1] && side.y2 == p2[1]
                //    );
                //    console.log(`(${p1[0]}:${p1[1]}) (${p2[0]}:${p2[1]})`);
                //    if (so) console.log('TRUE');
                //    if (p2 && !so) {
                //        sides.push({
                //            x1: p1[0]
                //            , x2: p2[0]
                //            , y1: p1[1]
                //            , y2: p2[1]
                //            , l: Math.sqrt((p1[0] - p2[0]) * (p1[0] - p2[0]) + (p1[1] - p2[1]) * (p1[1] - p2[1]))
                //        });
                //    }
                //    //graphFull.push([, vertices[triangles[--i]], vertices[triangles[--i]]]);
                //}
                //
                //console.log(sides.length);
                //
                //let gfx = this.level.add.graphics();
                //sides.map(side => {
                //    gfx.lineStyle(10, 0xFF, 0.2);
                //    gfx.moveTo(side.x1, side.y1);
                //    gfx.lineTo(side.x2, side.y2);
                //});


                //let graphFull = [];
                //for (let i = triangles.length; i;) {
                //    graphFull.push([vertices[triangles[--i]], vertices[triangles[--i]], vertices[triangles[--i]]]);
                //}
                //
                //let gfxDelaunay = this.level.add.graphics();
                //gfxDelaunay.lineStyle(1, 0x0, 1.1);
                //for (let i = 1; i--;) {
                //    gfxDelaunay.lineStyle(5, (Math.random() * 0xFFFFFF));
                //    gfxDelaunay.moveTo(graphFull[i][0][0], graphFull[i][0][1]);
                //    gfxDelaunay.lineTo(graphFull[i][1][0], graphFull[i][1][1]);
                //    gfxDelaunay.lineTo(graphFull[i][2][0], graphFull[i][2][1]);
                //}
                //
                //let graphMST = [];
                //graphFull.map((triangle) => {
                //    let sides = triangle.map((p1, pointIndex) => {
                //        let p2 = triangle[(pointIndex + 1) % 3];
                //        return {
                //            x1: p1[0]
                //            , x2: p2[0]
                //            , y1: p1[1]
                //            , y2: p2[1]
                //            , l: Math.sqrt((p1[0] - p2[0]) * (p1[0] - p2[0]) + (p1[1] - p2[1]) * (p1[1] - p2[1]))
                //        };
                //    });
                //
                //    graphMST.push(_.min(sides, (s) => s.l));
                //})
                //let gfxMST = this.level.add.graphics();
                //gfxMST.lineStyle(1, 0xff0000, 1.1);
                //for (let i = graphMST.length; --i;) {
                //    gfxMST.moveTo(graphMST[i].x1, graphMST[i].y1);
                //    gfxMST.lineTo(graphMST[i].x2, graphMST[i].y2);
                //}

                //for (let triangleIndex = triangles.length; triangleIndex;) {
                //    let sides = [
                //        vertices[triangles[--triangleIndex]][0] * vertices[triangles[triangleIndex]][0] + vertices[triangles[triangleIndex]][1] * vertices[triangles[triangleIndex]][1]
                //    ]
                //    graph.moveTo();
                //    graph.lineTo(vertices[triangles[--triangleIndex]][0], vertices[triangles[triangleIndex]][1]);
                //    graph.lineTo(vertices[triangles[--triangleIndex]][0], vertices[triangles[triangleIndex]][1]);
                //}
            })
            .catch(console.error.bind(console));
    }

    update() {
    }
};

