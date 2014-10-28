'use strict';

/* Directives */
var xiongjiDirectives = angular.module('directivesModule', []);

xiongjiDirectives.directive('lineChart', ['$log', function($log) {
  $log.log("xiongjiDirectives.directive");

  return {
    restrict: 'AE',
    scope: { results: '=outerresults' },
    templateUrl: 'partials/linechart.html',
    link: function(scope, element, attrs) {
      $log.log("link function called");

      //here attrs is useless could delete
      var data = scope.results;
      
      var graph = Morris.Line({
          element: 'morris-line-chart',
          data: [],
          xkey: 'Date',
          ykeys: ['Close'],
          labels: ['Close Price']
      });

      scope.$watch('results', function(newResults) {
        $log.log("scope.$watch results", newResults);

        angular.forEach(newResults, function(result, index) {
          result.Close = parseFloat(result.Close);
        }); 
        
        //update the morris graph
        graph.setData(newResults);
      });
      
    }
  };
}]).
directive('zwlCarousel', ['$log', function($log) {
  return{
    restrict: 'E',
    scope: {},
    templateUrl: 'partials/my-carousel.html',
    nil: console.log('test')
  };

}]);
