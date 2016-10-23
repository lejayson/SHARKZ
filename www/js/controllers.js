angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $state, $ionicModal, $timeout, firebase) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    firebase.auth().signInWithEmailAndPassword($scope.loginData.username, $scope.loginData.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // ...
    });
    firebase.auth().onAuthStateChanged(function(user) {
      if(user) {
        $state.go("app.home");
      }
    });
  };
})


.controller('allclientsCtrl', function($scope, $state, $ionicSlideBoxDelegate) {

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

})

.controller('homeCtrl', function($scope, $state, $ionicSlideBoxDelegate) {

  $scope.open = function() {
    $state.go('tabs.home', {});
  };

  $scope.buttons = [{
    name: 'AGENCY'
  }, {
    name: 'HMIS'
  }];

  $scope.slide = function($index) {
    $scope.current = $index;
    $ionicSlideBoxDelegate.slide($index);
  }

})
