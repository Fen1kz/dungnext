module.exports = (app => {
    app.service('DnextGameService', require('./dnext-game.service'));
    app.directive('dnextGame', require('./dnext-game/dnext-game.directive'));
    app.directive('dnextGameToolbar', require('./dnext-game-toolbar/dnext-game-toolbar.directive'));

    app.config(['$stateProvider', ($stateProvider) => {
        $stateProvider.state('app.dnext-game', {
            url: '/home'
            , views: {
                'main@': {
                    template: `<dnext-game></dnext-game>`
                }
                , 'toolbar@': {
                    template: `<dnext-game-toolbar></dnext-game-toolbar>`
                }
            }
        });
    }]);
});