 'use strict';

/* Controllers */

var xiongjiControllers = angular.module('xiongjiControllers', ['xiongjiFilters', 'xiongjiServices']);

xiongjiControllers.controller('chartCtrl', ['$scope','$http', '$log','$filter','ajaxFactory',
  function($scope, $http, $log, $filter, ajaxFactory) {

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
      //$log.log("ajax", ajaxFactory);
      ajaxFactory.setStockName(name);
      ajaxFactory.callStockHistory().then(function(data) {
        $scope.results = data.query.results.row;
        $scope.results.splice(0, 1);  // Delete first headline (column name) row
        $scope.results.splice(100);   // TODO(wenli): test first 100 only

        $scope.updateDisplay();
      }, function(data) {
        alert(data);
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

