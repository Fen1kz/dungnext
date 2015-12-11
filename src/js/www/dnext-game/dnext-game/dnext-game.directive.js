module.exports = function () {
    return {
        restrict: 'E'
        , scope: {}
        , template: require('./dnext-game.html')
        , link: link
        , controller: controller
        , controllerAs: 'gameCtrl'
        , bindToController: true
    }
}

controller.$inject = ['DnextGameService'];
function controller(GameService) {
    this.GameService = GameService;
}

function link(scope, element, attr, ctrl) {
    let GameService = ctrl.GameService;
    let game = GameService.init(scope, element);

    Promise.all([
            game.state.add('Stage1', require('game/state/Stage1'))
            , game.state.add('Stage2', require('game/state/Stage2'))
            , game.state.add('Stage3', require('game/state/Stage3'))
        ])
        .then(() => game.state.start('Stage2'));
    //scope.event = (name, ...args) => {
    //    game.trigger(name, ...args);
    //};
    //
    //scope.selection = {};
    //game.on('object.selected', (event, object, type) => {
    //    scope.selection.type = type;
    //    scope.selection.object = object;
    //    scope.$digest();
    //});
}