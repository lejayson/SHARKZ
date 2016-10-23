function setShelterCtrl($scope, $stateParams, $firebaseObject, $firebaseArray, $ionicModal, $ionicSlideBoxDelegate ,$compile, $http, $timeout) {
  var rootRef = firebase.database().ref();
  var arrRef = rootRef.child('Assigned_bed');
  var tblRef;
  var arrVariable;
  $scope.Shelters = $firebaseArray(arrRef);
  
  $scope.setShelter = function(id, clientid){
    
    var privCMRef = arrRef.orderByChild("Bed_ID").equalTo(id);
    
    $scope.privCM = $firebaseArray(privCMRef);
    
    $scope.privCM.$loaded().then(function() {
      $scope.privCM[0].User_ID = clientid;
      $scope.privCM.$save(0).then(function(ref) {
        ref.key === $scope.privCM[0].$id; // true
      });
    });
    
    $scope.closeSetShelterPanel;
    
    console.log(id + " " + clientid);
  }
  
  $scope.unsetShelter = function(id, clientid){
    var privCMRef = arrRef.orderByChild("Bed_ID").equalTo(id);
    
    $scope.privCM = $firebaseArray(privCMRef);
    
    $scope.privCM.$loaded().then(function() {
      $scope.privCM[0].User_ID = 0;
      $scope.privCM[0].occupy = 0;
      $scope.privCM.$save(0).then(function(ref) {
        ref.key === $scope.privCM[0].$id; // true
      });
    });
    
    $scope.closeSetShelterPanel;
    
  }
};

angular.module("SHARKZ").controller("setShelterCtrl", ["$scope", "$stateParams", "$firebaseObject", "$firebaseArray", "$ionicModal", "$ionicSlideBoxDelegate", "$compile", "$http", "$timeout", setShelterCtrl]);