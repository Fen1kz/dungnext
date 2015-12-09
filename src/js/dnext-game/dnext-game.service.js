let angular = require('angular');
let Game = require('engine/Game');

service.$inject = ['$location'];

function service($location) {
    return {
        init: (ngScope, element) => {
            this.game = new Game(800, 600, {
                backgroundColor: 0xFFFFFF
                , seed: $location.search().seed
            });
            angular.element(element[0].querySelector('#canvas')).append(this.game.renderer.view);

            return this.game;
        }
    }
}

module.exports = service;