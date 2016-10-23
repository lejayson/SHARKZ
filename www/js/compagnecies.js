function compAgenciesCtrl($scope, $stateParams, $firebaseObject, $firebaseArray, $ionicModal, $ionicSlideBoxDelegate ,$compile, $http, $timeout) {
  var rootRef = firebase.database().ref();
  var arrRef = rootRef.child('agencies');
  $scope.agenciesArr = $firebaseArray(arrRef);
}
angular.module("SHARKZ").controller("compAgenciesCtrl", ["$scope", "$stateParams", "$firebaseObject", "$firebaseArray", "$ionicModal", "$ionicSlideBoxDelegate", "$compile", "$http", "$timeout", compAgenciesCtrl]);
