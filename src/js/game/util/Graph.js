module.exports = class Graph {
    constructor() {
        this.points = [];
    }

    add(point) {
        this.points.push(point);
    }

    draw(gfx) {
        gfx.clear();
        gfx.beginFill();
        this.points.forEach((p) => {
            gfx.drawCircle(p.x, p.y, 5);
        })
    }
};