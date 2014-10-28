'use strict';

/* Services */
var xiongjiServices = angular.module('xiongjiServices', []);

xiongjiServices.factory('ajaxFactory', function($http, $q) {
  var service = {};
  var prefixUrl = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20csv%20where%20url%20%3D%20'http%3A%2F%2Fichart.finance.yahoo.com%2Ftable.csv%3Fs%3D";
  var suffixUrl = "'%20and%20columns%3D%22Date%2COpen%2CHigh%2CLow%2CClose%2CVolume%2CAdjClose%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=JSON_CALLBACK";
  var _stockName = '';
  var _finalUrl = '';

  var makeUrl = function() {
    _finalUrl = prefixUrl + _stockName + suffixUrl;
    return _finalUrl;
  }

  service.setStockName = function(stockName) {
    _stockName = stockName;
  }

  service.getStockName = function() {
    return _stockName;
  }

  service.callStockHistory = function() {
    makeUrl();
    var deferred = $q.defer();
    $http({
      method: 'JSONP',
      url: _finalUrl
    }).
    success(function(data) {
      // $log.log("json file data", data);
      // $log.log("defer", deferred);
      deferred.resolve(data);
    }).
    error(function() {
      deferred.reject('an error in http call');
    });

    return deferred.promise;
  }
  return service;

});


