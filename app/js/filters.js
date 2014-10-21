'use strict';

/* Filters */

var xiongjiFilters = angular.module('xiongjiFilters', []);

xiongjiFilters.filter("dateRange", ['$log',function($log) {
  return function(input, date) {
    // CONSTANT IS FOR READ ONLY.
    var d = 100 - date;
    return input.slice(date);
  }

}]);
