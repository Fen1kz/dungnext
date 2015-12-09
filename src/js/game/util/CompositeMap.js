let _ = require('lodash');


module.exports = class CompositeMap {
    constructor() {
        this.$map = {};
    }

    key(key) {
        return key ? key.toString() : void 0;
    }

    put(key, value) {
        //if (!override && this.key(key) in this.$map) throw `CompositeMap.put(${key}, ${value}, false)`;
        this.$map[this.key(key)] = value;
        return this;
    }

    get(...key) {
        return this.$map[this.key(...key)];
    }

    remove(...key) {
        delete this.$map[this.key(...key)];
    }

    addAll(map) {
        _.assign(this.$map, map.$map);
        return this;
    }

    findKey(...key) {
        return _.findKey(this.$map, this.key(...key));
    }

    removeByValue(value) {
        this.remove(this.findKey(value));
    }

    forEach(cb, $this) {
        _.forIn(this.$map, cb, $this);
        return this;
    }

    clone() {
        return _.cloneDeep(this);
    }

    toArray() {
        return _.values(this.$map);
    }

    get length() {
        return _.keys(this.$map).length;
    }
}
