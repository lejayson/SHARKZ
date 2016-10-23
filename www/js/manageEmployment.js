function manageEmploymentCtrl($scope, $stateParams, $firebaseObject, $firebaseArray, $ionicModal, $ionicSlideBoxDelegate ,$compile, $http, $timeout) {
  var rootRef = firebase.database().ref();
  var arrRef = rootRef.child('employment');
  var tblRef;
  var arrVariable;
  $scope.EmploymentProg = $firebaseArray(arrRef);
  $scope.addServices = function(id, index){
    tblRef = rootRef.child('assignedEmployment').child(id).child($scope.EmploymentProg[index].ID);
    tblRef.set({Service: $scope.EmploymentProg[index].Service, Description: $scope.EmploymentProg[index].Description}).then(function(ref) {});
  }
}
angular.module("SHARKZ").controller("manageEmploymentCtrl", ["$scope", "$stateParams", "$firebaseObject", "$firebaseArray", "$ionicModal", "$ionicSlideBoxDelegate", "$compile", "$http", "$timeout", manageEmploymentCtrl]);
