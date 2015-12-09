import angular from 'angular';
import 'angular-material';
import 'angular-ui-router';
import 'js-data';
import 'js-data-angular';
import 'angular-bluebird-promises';

const APP_NAME = 'dungnext';
const app = angular.module(APP_NAME, [
    'ui.router'
    , 'ngMaterial'
    , 'js-data'
    , 'mwl.bluebird'
]);

app.config(['$urlRouterProvider', '$stateProvider', ($urlRouterProvider, $stateProvider) => {
    $stateProvider.state('app', {
        url: ''
        , abstract: true
    });

    $urlRouterProvider.otherwise('/home');
}]);

app.controller('AppCtrl', ['$mdSidenav', function ($mdSidenav) {
    this.toggleSidenav = (menuId) => $mdSidenav(menuId).toggle();
}]);

app.service('DnextGameService', require('./dnext-game/dnext-game.service'));
app.directive('dnextGame', require('./dnext-game/dnext-game.directive'));

require('./home/config.home');