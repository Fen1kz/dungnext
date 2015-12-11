let PIXI = require('pixi.js');

class Point extends PIXI.Point {
    add(p) {
        this.x += p.x;
        this.y += p.y;
        return this;
    }

    sub(p) {
        this.x -= p.x;
        this.y -= p.y;
        return this;
    }

    mult(m) {
        this.x *= m;
        this.y *= m;
        return this;
    }

    clone() {
        return new Point(this.x, this.y);
    }

    length2() {
        return this.x * this.x + this.y * this.y;
    }

    length() {
        return Math.sqrt(this.length2());
    }

    nor() {
        let length = this.length();
        this.x /= length;
        this.y /= length;
        return this;
    }
}

class Rectangle extends PIXI.Rectangle {
    createCenter() {
        return new Point(this.x + this.width * .5, this.y + this.height * .5)
    }

    static intersect(rect1, rect2) {
        return (rect1.x <= rect2.x + rect2.width
        && rect2.x <= rect1.x + rect1.width
        && rect1.y <= rect2.y + rect2.height
        && rect2.y <= rect1.y + rect1.height);
    }
}

module.exports = {
    Point: Point
    , Rectangle: Rectangle
};