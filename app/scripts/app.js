'use strict';

angular.module('bitcoinPriceApp', [
  'ngRoute',
  'ngSanitize',
  'ui.bootstrap'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
  $routeProvider.when('/', {
    templateUrl: '../views/main.html',
    controller: 'MainCtrl'
  });
}]);

