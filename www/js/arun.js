function arunCtrl($scope, $http, $firebaseObject, $firebaseArray, $firebase, $state, $ionicSlideBoxDelegate, $ionicScrollDelegated){

  $scope.filterOptions = [{"Name": "Veteran", "VeteranStatus": 1}, {"Name": "Non-Veteran", "VeteranStatus": 0}, {"Name": "ALL", "VeteranStatus": ""}];
  $scope.sortOptions1 = ["First_Name", "Last_Name"];
  $scope.volunteers = [];
  $scope.propertyName = 'First_Name';
  $scope.reverse = false;
  $scope.itemPerPage = 10;
  $scope.currentPage1 = 0;

//Firebase method
  var rootRef = firebase.database().ref();
  var arrRef = rootRef.child('St_Patrick');
  $scope.clients = $firebaseArray(arrRef);

  $scope.clients.$loaded().then(function(pages) {
    $scope.clients = getAge($scope.clients);
    $scope.clients = setVet($scope.clients);
    $scope.pages = toPages($scope.clients, $scope.itemPerPage);
  });

  $scope.propertyName = 'id';
  $scope.reverse = false;

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

  $scope.open = function() {
    $state.go('tabs.home', {});
  };

  $scope.buttons = [{
    name: 'Open'
  }, {
    name: 'Completed'
  }, {
    name: 'Closed'
  }];

  $scope.slide = function($index) {
    $scope.current = $index;
    $ionicSlideBoxDelegate.slide($index);
  }

}
angular.module("SHARKZ").controller("arunCtrl", ["$scope", "$http", "$firebaseObject", "$firebaseArray", "firebase", arunCtrl]);
