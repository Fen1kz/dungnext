module.exports = class CompositeMap2d extends require('game/util/CompositeMap') {
    key(X, Y) {
        return X + ":" + Y;
    }

    put(X, Y, value) {
        return this.$map[this.key(X, Y)] = value;
    }
};