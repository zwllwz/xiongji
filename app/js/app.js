'use strict';

/* App Module */

var xiongjiApp = angular.module('xiongjiApp', [
  'ngRoute',

  'xiongjiControllers',
  'directivesModule',
  'xiongjiAnimations'


  ]);

xiongjiApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/charts', {
        templateUrl: 'partials/charts.html',
        controller: 'chartCtrl'
      }).
      when('/welcome', {
        templateUrl: 'partials/welcome.html',
        controller: 'welcomeCtrl'
      }).
      when('/algorithm', {
        templateUrl: 'partials/algorithm.html',
        controller: 'algorithmCtrl'
      }).
      otherwise({
          redirectTo: '/charts'
      });

  }]);
