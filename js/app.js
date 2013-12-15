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
  // Bootstrap a couple discussion channels by hardcoding some keys
  $scope.channels = [{'name': 'Messages to you', 'pk': JSON.parse(localStorage['pk']), 'sk': JSON.parse(localStorage['sk'])},
  {'name': 'Politics Discussions', 
    'pk': [97, 39, 213, 87, 239, 40, 28, 168, 134, 162, 157, 148, 211, 253, 38, 100, 167, 12, 73, 85, 66, 40, 213, 5, 164, 105, 99, 139, 43, 9, 120, 114],
    'sk': [223, 146, 158, 255, 44, 123, 44, 71, 149, 246, 96, 68, 99, 45, 231, 238, 41, 230, 134, 7, 242, 94, 53, 251, 116, 171, 77, 138, 18, 208, 116, 61]},
  {'name': 'Crypto Discussions', 
    'pk': [245, 246, 193, 153, 229, 234, 254, 165, 139, 43, 49, 120, 44, 160, 12, 204, 205, 192, 155, 58, 12, 102, 228, 97, 165, 25, 249, 16, 189, 135, 129, 91],
    'sk': [229, 21, 94, 204, 217, 84, 83, 11, 185, 18, 197, 97, 106, 26, 147, 137, 82, 223, 167, 216, 125, 157, 46, 4, 71, 53, 166, 112, 37, 66, 155, 86]}];

  $scope.displayed_channel = 0;

  $scope.select_chan = function(chan) {
    $scope.displayed_channel = chan;
  }
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