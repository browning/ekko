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
      when('/messages', {
        templateUrl: 'templates/messages.html',
        controller: 'MsgsCtrl'
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

function MsgsCtrl($scope, $location, $routeParams) {

}

function KeysCtrl($scope, $location, $routeParams) {
  $scope.name = $routeParams.name;

  if ( !localStorage['pk'] ) {
    var nacl = nacl_factory.instantiate();
    mykeys = nacl.crypto_box_keypair();
    $scope.keys_existed = false
    $scope.pk = convertKeyToHex(mykeys.boxPk);
    $scope.sk = convertKeyToHex(mykeys.boxSk);

    localStorage['pk'] = JSON.stringify(mykeys.boxPk);
    localStorage['sk'] = JSON.stringify(mykeys.boxSk);
  }
  else {
    $scope.keys_existed = true
    $scope.pk = convertKeyToHex(JSON.parse(localStorage['pk']));
  }

  $scope.regenerate_keys = function() {
    var nacl = nacl_factory.instantiate();
    mykeys = nacl.crypto_box_keypair();
    $scope.pk = convertKeyToHex(mykeys.boxPk);
    $scope.sk = convertKeyToHex(mykeys.boxSk);

    localStorage['pk'] = JSON.stringify(mykeys.boxPk);
    localStorage['sk'] = JSON.stringify(mykeys.boxSk);
  }

  $scope.proceed = function() {
    $location.path("messages")
  }

}