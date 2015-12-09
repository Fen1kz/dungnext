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
function controller(DnextGameService) {
    this.DnextGameService = DnextGameService;
}

function link(scope, element, attr, ctrl) {
    let DnextGameService = ctrl.DnextGameService;
    let game = DnextGameService.init(scope, element);

    game.state.add('first', require('game/state/First'));
    game.state.start('first');

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