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

function convertKeyToHex(key) {
  hexstring = ""
  for (i in key) {
    hexbyte = key[i].toString(16);
    if (hexbyte.length == 1) {
      hexbyte = "0" + hexbyte
    }
    hexstring = hexstring + hexbyte
  }
  return hexstring
}

function KeysCtrl($scope, $location, $routeParams) {
  $scope.name = $routeParams.name;

  if ( !localStorage['pk'] ) {
    $scope.message = "Creating a key for you"
    var nacl = nacl_factory.instantiate();
    mykeys = nacl.crypto_box_keypair();
    $scope.pk = convertKeyToHex(mykeys.boxPk);
    $scope.sk = convertKeyToHex(mykeys.boxSk);

    localStorage['pk'] = JSON.stringify(mykeys.boxPk);
    localStorage['sk'] = JSON.stringify(mykeys.boxSk);
  }
  else {
    $scope.message = "You already have keys";
    $scope.pk = convertKeyToHex(JSON.parse(localStorage['pk']));
  }

}