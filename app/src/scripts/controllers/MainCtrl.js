angular.module ('app').controller ('MainCtrl', function ($scope, Source) {
  Source.query (function (sources) { $scope.sources = sources; console.log (sources); });
  $scope.example = function (x) {
    return x * x;
  }
});
