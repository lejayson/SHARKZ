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

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('pages/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

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

.controller('clientCtrl', function($scope, $state, $ionicSlideBoxDelegate, $ionicScrollDelegate, $timeout) {

  $timeout(function() {
   $ionicScrollDelegate.$getByHandle('messages').scrollBottom(true);
 });

  $scope.data = {
    showDelete: false
  };


  $scope.onItemDelete = function(item) {
    $scope.items.splice($scope.items.indexOf(item), 1);
  };

  $scope.items = [{
    id: 'General Equivalency Diploma GED Program',
    description: 'improves English, math, social studies, and science skills to prepare for GED test'
  }, {
    id: 'General Equivalency Diploma GED Program',
    description: 'improves English, math, social studies, and science skills to prepare for GED test'
  }, {
    id: 'General Equivalency Diploma GED Program',
    description: 'improves English, math, social studies, and science skills to prepare for GED test'
  }, {
    id: 'General Equivalency Diploma GED Program',
    description: 'improves English, math, social studies, and science skills to prepare for GED test'
  }];

  $scope.messages = [{
    id: 'Kim',
    date: '9:20am 10.19.2016',
    description: 'Hello'
  }, {
    id: 'Jayson',
    date: '9:20am 10.19.2016',
    description: 'How are you'
  }, {
    id: 'Jayson',
    date: '9:20am 10.19.2016',
    description: 'I am good, you?'
  }, {
    id: 'Jayson',
    date: '9:20am 10.19.2016',
    description: 'I am good, you?'
  }, {
    id: 'Jayson',
    date: '9:20am 10.19.2016',
    description: 'I am good, you?'
  }, {
    id: 'Kim',
    date: '9:20am 10.19.2016',
    description: 'Ok'
  }];


  $scope.open = function() {
    $state.go('tabs.home', {});
  };

  $scope.buttons = [{
    name: 'lnr lnr-user'
  }, {
    name: 'lnr lnr-home'
  }, {
    name: 'lnr lnr-briefcase'
  }, {
    name: 'lnr lnr-heart'
  }, {
    name: 'lnr lnr-bubble'
  }];

  $scope.slide = function($index) {
    $scope.current = $index;
    $ionicSlideBoxDelegate.slide($index);
  }
})
