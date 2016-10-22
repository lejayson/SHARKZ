function jaysonCtrl($scope, $firebaseObject, $firebaseArray, $compile, $http, $timeout) {
  $scope.client = {};
  var rootRef = firebase.database().ref();
  var arrRef = rootRef.child('JaysonSampleClient');
  $scope.testvar = $firebaseArray(arrRef);
  $scope.addClient = function () {
    $scope.testvar.$add({name: $scope.client.name, gender:$scope.client.gender}).then(function(ref) {});
    $scope.client.name = null;
  }
}
angular.module("SHARKZ").controller("jaysonCtrl", ["$scope", "$firebaseObject", "$firebaseArray", "$compile", "$http", "$timeout", jaysonCtrl]);
