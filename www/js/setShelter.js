function setShelterCtrl($scope, $stateParams, $firebaseObject, $firebaseArray, $ionicModal, $ionicSlideBoxDelegate ,$compile, $http, $timeout, firebase) {
  
  var tblRef;
  var arrVariable;
  
  
  $scope.filterOptions = [{"Name": "Full", "status": "full"}, {"Name": "Availible", "status": "available"}, {"Name": "Closed", "status": "closed"}, {"Name": "ALL", "status": ""}];
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
    $scope.agencies = displaypic($scope.agencies);
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
  $scope.assign = function(agency){
    console.log(agency);
  }
  
  $scope.setShelter = function(aname){
    
    var privCMRef = arrRef.orderByChild("Agency").equalTo(aname);
    
    $scope.privCM = $firebaseArray(privCMRef);
    
    $scope.privCM.$loaded().then(function() {
    
      $scope.privCM[0].num_beds = $scope.privCM[0].num_beds - 1;
      $scope.privCM.$save(0).then(function(ref) {
        ref.key === $scope.privCM[0].$id; // true
      });
    
      
      var tmpdata = {"Service": $scope.privCM[0].Agency, "Description": "Hours of Operation: " + $scope.privCM[0].hours_ops};
      $scope.houseitems.push(tmpdata);
      $scope.closeSetShelterPanel();
    });
  }
  
};

angular.module("SHARKZ").controller("setShelterCtrl", ["$scope", "$stateParams", "$firebaseObject", "$firebaseArray", "$ionicModal", "$ionicSlideBoxDelegate", "$compile", "$http", "$timeout", "firebase", setShelterCtrl]);