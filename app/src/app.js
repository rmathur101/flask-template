angular.module ('app', ['ngResource', 'ngRoute', 'ui.bootstrap']);

angular.module ('app').config (function ($interpolateProvider) {
  $interpolateProvider.startSymbol ('[*');
  $interpolateProvider.endSymbol ('*]');
});

angular.module ('app').config (function ($routeProvider) {
  $routeProvider.
    when ('/', {
      templateUrl: 'public/dist/views/main.html',
      controller: 'MainCtrl'
    }).
    otherwise ({
      redirectTo: '/'
  });
});
