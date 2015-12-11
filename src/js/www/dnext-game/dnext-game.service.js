let angular = require('angular');
let Game = require('engine/Game');

Service.$inject = ['$location'];

function Service($location) {
    this.$location = $location;
    this.init = (ngScope, element) => {
        this.game = new Game(800, 600, {
            backgroundColor: 0xFFFFFF
            , seed: this.$location.search().seed
        });
        angular.element(element[0].querySelector('#canvas')).append(this.game.renderer.view);
        return this.game;
    };
}

module.exports = Service;