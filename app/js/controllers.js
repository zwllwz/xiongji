 'use strict';

/* Controllers */

var xiongjiControllers = angular.module('xiongjiControllers', ['xiongjiFilters']);

xiongjiControllers.controller('chartCtrl', ['$scope', '$http','$log','$filter',
  function($scope, $http, $log, $filter) {
    //var url1 = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20csv%20where%20url%20%3D%20'http%3A%2F%2Fichart.finance.yahoo.com%2Ftable.csv%3Fs%3DAAPL'%20and%20columns%3D%22Date%2COpen%2CHigh%2CLow%2CClose%2CVolume%2CAdjClose%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK";

    $scope.stock = {};
    $scope.stock.date = 0;
    $scope.results = [];

    $scope.updateDisplay = function() {
      $log.log("updateDisplay");
      if (!$scope.results) {
        return;
      }
      $scope.resultsToDisplay = $filter('dateRange')($scope.results, $scope.stock.date);
    }

    $scope.search = function(name) {
      var prefix = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20csv%20where%20url%20%3D%20'http%3A%2F%2Fichart.finance.yahoo.com%2Ftable.csv%3Fs%3D";
      var suffix = "'%20and%20columns%3D%22Date%2COpen%2CHigh%2CLow%2CClose%2CVolume%2CAdjClose%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK";
      var url = prefix + name + suffix;
      $http.jsonp(url)
       .success(function(data) {
        $scope.results = data.query.results.row;
        $scope.results.splice(0, 1);  // Delete first headline (column name) row
        $scope.results.splice(100);   // TODO(wenli): test first 100 only

        $scope.updateDisplay();
      });
    };

    $scope.dateChange = function(date) {
      $log.log("scope.dateChange", date);

      $scope.updateDisplay();

      $log.log("scope.dateChange results", $scope.results);
    };

  }]);


xiongjiControllers.controller('welcomeCtrl', ['$scope', '$http',
  function($scope, $http) {
    $http.get('json/clientInfo.json').success(function(data) {
      $scope.apple = $.csv.toObjects(data);
    })
  }]);


xiongjiControllers.controller('algorithmCtrl', ['$scope', function($scope) {
  $scope.isPrime = function(num) {
    var a = parseInt(num);
    if (a <=3) {
      $scope.result = 'is prime number ';
    } else {
      for(var i = 2; i < Math.sqrt(a); i++) {
        if(a % i === 0) {
          $scope.result = "not a prime number";
          return;
        }
      }
    }
    $scope.result = 'is prime number';
  };

}]);

