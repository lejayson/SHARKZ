// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('SHARKZ', ['ionic', 'starter.controllers', 'firebase', 'ngCordova'])

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
        //templateUrl: 'pages/coc/home.html' //Use if home pages are split
        templateUrl: 'pages/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('app.cocdata', {
    url: '/coc/data',
    views: {
      'menuContent': {
        templateUrl: 'pages/coc/data.html',
        controller: 'dataCtrl'
      }
    }
  })

  .state('app.cocallclients', {
    url: '/coc/allclients',
    views: {
      'menuContent': {
        templateUrl: 'pages/coc/allclients.html',
      }
    }
  })

  .state('app.cocshelters', {
    url: '/coc/shelters',
    views: {
      'menuContent': {
        templateUrl: 'pages/coc/shelters.html',
      }
    }
  })


  .state('app.agencyhome', {
    url: '/agency/home',
    views: {
      'menuContent': {
        //templateUrl: 'pages/agency/home.html' //Use if home pages are split
        templateUrl: 'pages/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('app.agencyclient', {
    url: '/agency/client/:id',
    views: {
      'menuContent': {
        templateUrl: 'pages/agency/client.html'
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
      }
    }
  })

  .state('app.agencystatus', {
    url: '/agency/status',
    views: {
      'menuContent': {
        templateUrl: 'pages/agency/status.html',
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
