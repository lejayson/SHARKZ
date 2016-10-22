function arunCtrl($scope, $state, $http, $firebaseObject, $firebaseArray, $firebase){

  $scope.filterOptions = [{"Veteran": 1}, {"Non-Veteran": 0}, {"ALL": ""}];
  $scope.volunteers = [];
  $scope.propertyName = 'id';
  $scope.reverse = false;
  $scope.itemPerPage = 10;
  $scope.currentPage1 = 0;
  $scope.currentPage2 = 0;

//Firebase method
  var rootRef = firebase.database().ref();
  var ppRef = rootRef.child('P&P');
  var spRef = rootRef.child('St_Patrick');
  $scope.ppclients = $firebaseArray(ppRef);
  $scope.spclients = $firebaseArray(spRef);
  console.log($scope.ppclients);

  $scope.ppclients.$loaded().then(function(pages) {
    $scope.pppages = toPages($scope.ppclients, $scope.itemPerPage);
  });
  $scope.spclients.$loaded().then(function(pages) {
    $scope.sppages = toPages($scope.spclients, $scope.itemPerPage);
  });
//http + php method
/***
  $http.get("http://test.ohai-app.com/Credential/volunteerList.php")
  .success(function(response) {
    $scope.volunteers = response.volunteers;
    $scope.pages = toPages($scope.volunteers, $scope.itemPerPage);
    console.log($scope.volunteers);
  });
***/

  $scope.propertyName = 'id';
  $scope.reverse = false;


  $scope.clientDetail =  function(id){
    $state.go("app.agencyclient", {id: id});
  }
  $scope.sortBy = function(propertyName) {
    if ($scope.reverse == true){
      $scope.reverse = false;
    }
    else {
      $scope.reverse = true;
    }
    $scope.propertyName = propertyName;
  };

  $scope.decreasePage = function(page) {
    return decrease(page);
    console.log(page);
  }
  $scope.increasePage = function(page, max) {
    return increase(page, max);
    console.log(page);
  }

}
angular.module("SHARKZ").controller("arunCtrl", ["$scope", "$state", "$http", "$firebaseObject", "$firebaseArray", "firebase", arunCtrl]);
