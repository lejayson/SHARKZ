function manageMedicalCtrl($scope, $stateParams, $firebaseObject, $firebaseArray, $ionicModal, $ionicSlideBoxDelegate ,$compile, $http, $timeout) {
  var rootRef = firebase.database().ref();
  var arrRef = rootRef.child('health');
  var tblRef;
  var arrVariable;
  $scope.MedicalProg = $firebaseArray(arrRef);
  $scope.addServices = function(id, index){
    tblRef = rootRef.child('assignedMedical').child(id).child($scope.MedicalProg[index].ID);
    tblRef.set({Service: $scope.MedicalProg[index].Service, Description: $scope.MedicalProg[index].Description}).then(function(ref) {});
  }
}
angular.module("SHARKZ").controller("manageMedicalCtrl", ["$scope", "$stateParams", "$firebaseObject", "$firebaseArray", "$ionicModal", "$ionicSlideBoxDelegate", "$compile", "$http", "$timeout", manageMedicalCtrl]);
