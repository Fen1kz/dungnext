let angular = require('angular');

const app = angular.module('dungnext');

app.config(['$stateProvider', ($stateProvider) => {
    $stateProvider.state('app.home', {
        url: '/home'
        , views: {
            'main@': {
                template: `<dnext-game></dnext-game>`
            }
        }
    });
}]);
