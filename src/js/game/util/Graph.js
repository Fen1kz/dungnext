let PIXI = require('pixi.js');

class Edge {
    constructor(p) {
        this.p = p;
        this.triangles = [];
    }

    slope() {
        return (this.p[0].x - this.p[1].x) / (this.p[0].y - this.p[1].y);
    }

    draw(gfx) {
        gfx.lineStyle(1);
        gfx.moveTo(this.p0.x, this.p0.y);
        gfx.lineTo(this.p1.x, this.p1.y);
    }
}

class Triangle {
    constructor(p, e) {
        this.p = p;
        this.e = e;
        this.e.forEach(e => e.triangles.push(this));
    }

    calcCircumcircle() {
        let e0 = this.e[0];
        let e1 = this.e[1];
        let e0slope = e0.slope();
        let e1slope = e1.slope();
        let x0 = (
                e0slope * e1slope * (e1.p[1].y - e0.p[0].y)
                + e0slope * (e1.p[0].x + e1.p[1].x)
                + e1slope * (e0.p[0].x + e0.p[1].x)
            ) / (2 * (e0slope - e1slope));
        let y0 = ((e0.p[0].y + e0.p[1].y) / 2) - (2 * x0 - e0.x[0] - e0.x[1]) / (2 * e0slope);
        this.center = new PIXI.Point(x0, y0);
        this.radius2 = Math.pow(e0.p[0].x - this.center.x, 2) + Math.pow(e0.p[0].y - this.center.y, 2);
    }

    inCircumcircle(p) {
        var dx = this.center.x - p.x;
        var dy = this.center.y - p.y;
        var dist_squared = dx * dx + dy * dy;

        return (dist_squared <= this.radius_squared);
    }

    draw(gfx) {
        this.edges.forEach((e) => e.draw(gfx));
    }
}

module.exports = class Graph {
    constructor() {
        this.points = [];
        this.edges = [];
        this.triangles = [];
    }

    makeSuperTriangle() {
        let br = {max: this.points[0].clone(), min: this.points[0].clone()};
        this.points.forEach((p) => {
            if (p.x < br.min.x) br.min.x = p.x;
            if (p.y < br.min.y) br.min.y = p.y;
            if (p.x > br.max.x) br.max.x = p.x;
            if (p.y > br.max.y) br.max.y = p.y;
        });
        let hw = .5 * (br.max.x - br.min.x);
        let hh = .5 * (br.max.y - br.min.y);
        let p = [
            new PIXI.Point(br.min.x - hw, br.min.y)
            , new PIXI.Point(br.min.x + hw, br.max.y + hh)
            , new PIXI.Point(br.max.x + hw, br.min.y)
        ];
        let e = [
            new Edge([p[0], p[1]])
            , new Edge([p[1], p[2]])
            , new Edge([p[2], p[0]])
        ];
        let triangle = new Triangle(p, e);
    }

    draw(gfx) {
        gfx.clear();

        this.points.forEach((p) => {
            gfx.beginFill(p.color || 0x0);
            gfx.drawCircle(p.x, p.y, (2 + p.i) * .5);
            gfx.endFill();
        });

        this.edges.forEach((e) => {
            e.draw(gfx)
        });

        this.triangles.forEach((t) => {
            t.draw(gfx)
        });
    }
};