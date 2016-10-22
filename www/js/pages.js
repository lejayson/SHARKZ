// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('SHARKZ', ['ionic', 'starter.controllers', 'firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'pages/menu.html',
    controller: 'AppCtrl'
  })


  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'pages/login.html'
      }
    }
  })


  .state('app.cochome', {
    url: '/coc/home',
    views: {
      'menuContent': {
        templateUrl: 'pages/coc/home.html'
      }
    }
  })

  .state('app.cocdata', {
    url: '/coc/data',
    views: {
      'menuContent': {
        templateUrl: 'pages/coc/data.html'
      }
    }
  })

  .state('app.agencyhome', {
    url: '/agency/home',
    views: {
      'menuContent': {
        templateUrl: 'pages/agency/home.html'
      }
    }
  })

  .state('app.agencyclient', {
    url: '/agency/client',
    views: {
      'menuContent': {
        templateUrl: 'pages/agency/client.html',
        controller: 'clientCtrl'
      }
    }
  })

  .state('app.agencynewentry', {
    url: '/agency/newentry',
    views: {
      'menuContent': {
        templateUrl: 'pages/agency/newentry.html'
      }
    }
  })

  .state('app.agencycasemanager', {
    url: '/agency/casemanager',
    views: {
      'menuContent': {
        templateUrl: 'pages/agency/casemanager.html'
      }
    }
  })

  .state('app.agencyallclients', {
    url: '/agency/allclients',
    views: {
      'menuContent': {
        templateUrl: 'pages/agency/allclients.html',
        controllers: 'arunCtrl'
      }
    }
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'pages/home.html',
        controller: 'homeCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
