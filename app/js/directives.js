'use strict';

/* Directives */
var xiongjiDirectives = angular.module('directivesModule', []);

xiongjiDirectives.directive('lineChart', ['$log', function($log) {
  $log.log("test");

  return {
    restrict: 'AE',
    //transclude: true,
    // replace: 'true',
    scope: { results: '=' },
    templateUrl: 'partials/linechart.html',
    link: function(scope, element, attrs) {
      $log.log(attrs);
      var data = scope.results;
      $log.log(scope);
      scope.$watch('results', function(newResults) {
        angular.forEach(newResults, function(result, index) {
          result.Close = parseFloat(result.Close);
        });

        new Morris.Line({
          element: 'morris-line-chart',
          nil: $log.log("morris line",newResults),
          data: newResults,
          xkey: 'Date',
          ykeys: ['Close'],
          labels: ['Close Price']
        });
      });



      
    }
  };
}]);
