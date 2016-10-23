angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

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
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
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
