 'use strict';

/* Controllers */

var xiongjiControllers = angular.module('xiongjiControllers', []);

xiongjiControllers.controller('chartCtrl', ['$scope', '$http','$log',
  function($scope, $http, $log) {
    //var url1 = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20csv%20where%20url%20%3D%20'http%3A%2F%2Fichart.finance.yahoo.com%2Ftable.csv%3Fs%3DAAPL'%20and%20columns%3D%22Date%2COpen%2CHigh%2CLow%2CClose%2CVolume%2CAdjClose%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK";

    var str1 = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20csv%20where%20url%20%3D%20'http%3A%2F%2Fichart.finance.yahoo.com%2Ftable.csv%3Fs%3D";
    var str2 = "'%20and%20columns%3D%22Date%2COpen%2CHigh%2CLow%2CClose%2CVolume%2CAdjClose%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK";

    $scope.search = function (name) {
      var url = str1 + name + str2;
      $http.jsonp(url)
       .success(function(data) {
        $scope.results = data.query.results.row;
        $scope.results.splice(0, 1);
        $scope.results.splice(100);
        //$log.log(data.query);
        $log.log("Controller $scope.results", $scope.results);
      });
    }

    
  }]);

xiongjiControllers.controller('welcomeCtrl', ['$scope', '$http',
  function($scope, $http) {
    $http.get('json/clientInfo.json').success(function(data) {
      $scope.apple = $.csv.toObjects(data);
    })
  }]);

xiongjiControllers.controller('algorithmCtrl', ['$scope', function($scope) {
  

}]);

