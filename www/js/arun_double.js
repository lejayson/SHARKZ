function arun2Ctrl($scope, $http, $filter, $firebaseObject, $firebaseArray, $firebase, $state, $ionicSlideBoxDelegate, $ionicScrollDelegate){

  $scope.filterOptions = [{"Name": "Veteran", "VeteranStatus": 1}, {"Name": "Non-Veteran", "VeteranStatus": 0}, {"Name": "ALL", "VeteranStatus": ""}];
  $scope.sortOptions1 = ["First_Name", "Last_Name"];
  $scope.sortOptions2 = ["First_Name", "Last_Name"];
  $scope.volunteers = [];
  $scope.propertyName = 'First_Name';
  $scope.propertyName2 = 'First_Name';
  $scope.reverse = false;
  $scope.reverse2 = false;
  $scope.itemPerPage = 8;
  $scope.currentPage1 = 0;
  $scope.currentPage2 = 0;

//Firebase method
  var rootRef = firebase.database().ref();
  var ppRef = rootRef.child('P&P');
  var spRef = rootRef.child('St_Patrick');
  $scope.ppclients = $firebaseArray(ppRef);
  $scope.spclients = $firebaseArray(spRef);

  $scope.ppclients.$loaded().then(function(pages) {
    $scope.spclients.$loaded().then(function(pages) {
      $scope.Allpages = mergeTable($scope.ppclients, $scope.spclients);
      $scope.Allpages = getAge($scope.Allpages);
      $scope.Allpages = setVet($scope.Allpages);
      $scope.Allpages = $filter('orderBy')($scope.Allpages, 'Score', true);
      $scope.pages = toPages($scope.Allpages, $scope.itemPerPage);
    });
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

  $scope.sortBy2 = function(propertyName) {
    if ($scope.reverse2 == true){
      $scope.reverse2 = false;
    }
    else {
      $scope.reverse2 = true;
    }
    $scope.propertyName2 = propertyName;
  };

  $scope.decreasePage = function(page) {
    return decrease(page);
    console.log(page);
  }
  $scope.increasePage = function(page, max) {
    return increase(page, max);
    console.log(page);
  }

  $scope.remove = function(client){
    if(client.Agencies == "St. Patrick"){
      $scope.spclients.$loaded().then(function(pages) {
        pages.remove(client.$id);
      })
    }
    if(client.Agencies == "Peter & Paul"){
      $scope.ppclients.$loaded().then(function(pages) {
        pages.remove(client.$id);
      })
    }
  }

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
  $scope.edit = function(id){
    $state.go("app.agencyclient", { id: id });
  }

}
angular.module("SHARKZ").controller("arun2Ctrl", ["$scope", "$http", "$filter", "$firebaseObject", "$firebaseArray", "firebase", "$state", "$ionicSlideBoxDelegate", "$ionicScrollDelegate", arun2Ctrl]);
