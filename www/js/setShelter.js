function setShelterCtrl($scope, $stateParams, $firebaseObject, $firebaseArray, $ionicModal, $ionicSlideBoxDelegate ,$compile, $http, $timeout) {
  var rootRef = firebase.database().ref();
  var arrRef = rootRef.child('agencies');
  var tblRef;
  var arrVariable;
  $scope.Shelters = $firebaseArray(arrRef);
  
  $scope.setShelter = function(id, index){
    tblRef = rootRef.child('agencies').child(id).child($scope.Shelters[index].ID);
    tblRef.set({Service: $scope.Shelters[index].Service, Description: $scope.Shelters[index].Description});
  }
};

angular.module("SHARKZ").controller("setShelterCtrl", ["$scope", "$stateParams", "$firebaseObject", "$firebaseArray", "$ionicModal", "$ionicSlideBoxDelegate", "$compile", "$http", "$timeout", setShelterCtrl]);