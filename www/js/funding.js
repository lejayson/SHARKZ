function fundCtrl($scope, $http, $firebaseObject, $firebaseArray, $firebase, $state, $ionicModal, $ionicSlideBoxDelegate, $ionicScrollDelegate){

  $scope.currentPage1 = 0;
  $scope.itemPerPage = 5;

//Firebase method
  var rootRef = firebase.database().ref();
  var arrRef = rootRef.child('agencies');
  $scope.agencies = $firebaseArray(arrRef);
  var caseRef = rootRef.child('case_manager');
  $scope.casemanagers = $firebaseArray(caseRef);
  var clntRef= rootRef.child('St_Patrick');
  $scope.clients = $firebaseArray(clntRef);

  $scope.agencies.$loaded().then(function(pages) {
    for(i=0; i<$scope.agencies.length; i++) {
        if($scope.agencies.$getRecord(i).Agency == "St. Patrick"){
          $scope.agency = $scope.agencies.$getRecord(i);
        }
    }
  });
  $scope.casemanagers.$loaded().then(function(pages) {
    $scope.pages = toPages($scope.casemanagers, $scope.itemPerPage);
  });
  $scope.clients.$loaded().then(function(pages) {
    $scope.clients = getAge($scope.clients);
    $scope.children = 0;
    $scope.male = 0;
    $scope.female = 0;
    $scope.Asian = 0;
    $scope.Black = 0;
    $scope.NativeHIOtherPacific = 0;
    $scope.White = 0;
    $scope.Veteran = 0;

    for(i=0; i<$scope.clients.length; i++){
      if($scope.clients.$getRecord(i).age < 18){
        $scope.children++
      }
      if($scope.clients.$getRecord(i).gender == 1){
        $scope.male++
      }
      if($scope.clients.$getRecord(i).gender == 0){
        $scope.female++
      }
      if($scope.clients.$getRecord(i).Asian == 1){
        $scope.Asian++
      }
      if($scope.clients.$getRecord(i).Black == 1){
        $scope.Black++
      }
      if($scope.clients.$getRecord(i).NativeHIOtherPacific == 1){
        $scope.NativeHIOtherPacific++
      }
      if($scope.clients.$getRecord(i).White == 1){
        $scope.White++
      }
      if($scope.clients.$getRecord(i).VeteranStatus == 1){
        $scope.Veteran++
      }
    }
  });

  $scope.decreasePage = function(page) {
    return decrease(page);
  }
  $scope.increasePage = function(page, max) {
    return increase(page, max-1);
  }

}
angular.module("SHARKZ").controller("fundCtrl", ["$scope", "$http", "$firebaseObject", "$firebaseArray", "firebase", "$state", "$ionicModal", "$ionicSlideBoxDelegate", "$ionicScrollDelegate", fundCtrl]);
