function manageClientCtrl($scope, $stateParams, $firebaseObject, $firebaseArray, $ionicModal, $ionicSlideBoxDelegate ,$compile, $http, $timeout) {
  var rootRef = firebase.database().ref();
  var arrRef = rootRef.child('housing');
  var tblRef;
  var arrVariable;
  $scope.HousingProg = $firebaseArray(arrRef);
  $scope.addServices = function(id, index){
    tblRef = rootRef.child('assignedHousing').child(id).child($scope.HousingProg[index].ID);
    tblRef.set({Service: $scope.HousingProg[index].Service, Description: $scope.HousingProg[index].Description}).then(function(ref) {});
  }
}
angular.module("SHARKZ").controller("manageClientCtrl", ["$scope", "$stateParams", "$firebaseObject", "$firebaseArray", "$ionicModal", "$ionicSlideBoxDelegate", "$compile", "$http", "$timeout", manageClientCtrl]);
