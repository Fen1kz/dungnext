module.exports = function () {
    return {
        restrict: 'E'
        //, replace: true
        , scope: {}
        , template: require('./dnext-game-toolbar.html')
        //, link: link
        , controller: controller
        , controllerAs: 'ToolbarCtrl'
        , bindToController: true
    }
}

controller.$inject = ['DnextGameService'];
function controller(GameService) {
    this.state = () => GameService.game.state;
}