function arunCtrl($scope, $http, $filter, $firebaseObject, $firebaseArray, $firebase, $state, $ionicModal, $ionicSlideBoxDelegate, $ionicScrollDelegate){

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
  var globalRef = rootRef.child('global');
  $scope.clients = $firebaseArray(arrRef);
  var caseRef = rootRef.child('case_manager');
  var clientID;
  $scope.casemanagers = $firebaseArray(caseRef);

  $scope.clients.$loaded().then(function(pages) {
    $scope.clients = getAge($scope.clients);
    $scope.clients = setVet($scope.clients);
    $scope.clients = $filter('orderBy')($scope.clients, 'Score', true);
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
  $scope.clickDetail = function(id){
    $state.go("app.agencyclient", { id: id });
  }
  $ionicModal.fromTemplateUrl('pages/agency/assignCaseManager.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.casemanagermodal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeCaseManager = function() {
    $scope.casemanagermodal.hide();
  };

  // Open the login modal
  $scope.openCaseManager = function(id) {
    clientID = id;
    $scope.casemanagermodal.show();
  };
  $scope.assignCM = function(fn, ln){
    var privCMRef = arrRef.orderByChild("UserID").equalTo(clientID);
    var globalCMRef = globalRef.orderByChild("UserID").equalTo(clientID);
    //privCMRef.set({"Assigned_case": fn+" "ln});
    $scope.privCM = $firebaseArray(privCMRef);
    $scope.globalCM = $firebaseArray(globalCMRef);
    $scope.privCM.$loaded().then(function() {
      $scope.privCM[0].Assigned_case = fn+" "+ln;
      $scope.privCM.$save(0).then(function(ref) {
        ref.key === $scope.privCM[0].$id; // true
      });
    })
    $scope.globalCM.$loaded().then(function() {
      $scope.globalCM[0].Assigned_case = fn+" "+ln;
      $scope.globalCM.$save(0).then(function(ref) {
      });
    });
    $scope.closeCaseManager();
  }


}
angular.module("SHARKZ").controller("arunCtrl", ["$scope", "$http", "$filter", "$firebaseObject", "$firebaseArray", "firebase", "$state", "$ionicModal", "$ionicSlideBoxDelegate", "$ionicScrollDelegate", arunCtrl]);
