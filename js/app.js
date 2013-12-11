var ekkoApp = angular.module('ekkoApp', [
  'ngRoute',
]);

ekkoApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/generate_keys', {
        templateUrl: 'templates/generate_keys.html',
        controller: 'KeysCtrl'
      }).
      otherwise({
        redirectTo: '/generate_keys'
      });
  }]);

function KeysCtrl($scope, $location, $routeParams) {
  $scope.name = $routeParams.name;
}