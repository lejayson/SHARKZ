function clientCtrl($scope, $stateParams, $firebaseObject, $firebaseArray, $ionicModal, $ionicSlideBoxDelegate ,$compile, $http, $timeout) {
  var rootRef = firebase.database().ref();
  var objRef = rootRef.child('P&P').child($stateParams.id);
  var obj = $firebaseObject(objRef);
  var clientID;
  $scope.user = {};
  obj.$loaded().then(function() {
    var dobString = obj.DOB;
    clientID = obj.UserID;

    var serviceArrRef = rootRef.child('assignedHousing').child(clientID);
    $scope.houseitems = $firebaseArray(serviceArrRef);

    var employmentArrRef = rootRef.child('assignedEmployment').child(clientID);
    $scope.empitems = $firebaseArray(employmentArrRef);

    var MedicalArrRef = rootRef.child('assignedMedical').child(clientID);
    $scope.meditems = $firebaseArray(MedicalArrRef);

    var year = dobString.slice(-4);

    $scope.clientAge =  (2016 - parseInt(year,10));
    var splitDate = obj.Date_Created.split(' ');
    repDate = splitDate[0].split('/').join('.');
    $scope.clientEntryDate = repDate;

    var msgRef = rootRef.child('ArcNotes').child(clientID);
    $scope.messages = $firebaseArray(msgRef);
  });
  obj.$bindTo($scope, "clientInfo");
  $scope.data = {
    showDelete: false
  };

  $scope.addNotes = function(){
    //var list = arrRef.child('tsting');
    //list.set({"name": $scope.user.name,"msg": $scope.user.msg});
    var msgRef = rootRef.child('ArcNotes').child(clientID);
    msgvar = $firebaseArray(msgRef);
    msgvar.$add({ name: 'Sharkz', msg: $scope.user.msg , date: timenow()}).then(function(ref) {});
    $scope.user.msg = null;
  }

  $scope.onItemDelete = function(index) {
    $scope.houseitems.$remove($scope.houseitems[index]).then(function(arrRef) {});
  };
  $scope.onEmploymentDelete = function(index) {
    $scope.empitems.$remove($scope.empitems[index]).then(function(arrRef) {});
  };
  $scope.onMedicalDelete = function(index) {
    $scope.meditems.$remove($scope.meditems[index]).then(function(arrRef) {});
  };

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
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('pages/agency/addHousing.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.housingmodal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeServicePanel = function() {
    $scope.housingmodal.hide();
  };

  // Open the login modal
  $scope.openServicePanel = function() {
    $scope.housingmodal.show();
  };

  $ionicModal.fromTemplateUrl('pages/agency/addEmployment.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.employmentmodal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeEmploymentPanel = function() {
    $scope.employmentmodal.hide();
  };

  // Open the login modal
  $scope.openEmploymentPanel = function() {
    $scope.employmentmodal.show();
  };

  $ionicModal.fromTemplateUrl('pages/agency/addMedical.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.medicalmodal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeMedicalPanel = function() {
    $scope.medicalmodal.hide();
  };

  // Open the login modal
  $scope.openMedicalPanel = function() {
    $scope.medicalmodal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.addServices = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
  function timenow(){
    var now= new Date(),
    ampm= 'am',
    h= now.getHours(),
    m= now.getMinutes(),
    s= now.getSeconds();
    if(h>= 12){
        if(h>12) h -= 12;
        ampm= 'pm';
    }

    if(m<10) m= '0'+m;
    if(s<10) s= '0'+s;
    return now.toLocaleDateString()+ ' ' + h + ':' + m + ':' + s + ' ' + ampm;
  }

}
angular.module("SHARKZ").controller("clientCtrl", ["$scope", "$stateParams", "$firebaseObject", "$firebaseArray", "$ionicModal", "$ionicSlideBoxDelegate", "$compile", "$http", "$timeout", clientCtrl]);
