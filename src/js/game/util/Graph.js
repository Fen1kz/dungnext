module.exports = class Graph {
    constructor() {
        this.points = [];
        this.edges = [];
        this.triangles = [];
    }

    add(point) {
        this.points.push(point);
    }

    draw(gfx) {
        gfx.clear();
        this.points.forEach((p) => {
            gfx.beginFill(p.color || 0x0);
            gfx.drawCircle(p.x, p.y, (2 + p.i) * .5);
            gfx.endFill();
        })
    }
};