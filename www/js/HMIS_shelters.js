function shelterCtrl($scope, $state, $firebaseObject, $firebaseArray, $firebase){

  $scope.filterOptions = [{"Name": "Full", "status": "full"}, {"Name": "Availible", "status": "available"}, {"Name": "Closed", "status": "closed"}];
  $scope.sortOptions1 = ["First_Name", "Last_Name"];
  $scope.volunteers = [];
  $scope.propertyName = 'Agency';
  $scope.reverse = false;
  $scope.itemPerPage = 8;
  $scope.currentPage1 = 0;

//Firebase method
  var rootRef = firebase.database().ref();
  var arrRef = rootRef.child('agencies');
  $scope.agencies = $firebaseArray(arrRef);

  $scope.agencies.$loaded().then(function(pages) {
    $scope.pages = toPages($scope.agencies, $scope.itemPerPage);
  });

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
angular.module("SHARKZ").controller("shelterCtrl", ["$scope", "$state", "$firebaseObject", "$firebaseArray", "firebase", shelterCtrl]);
