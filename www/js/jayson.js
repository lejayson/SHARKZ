function jaysonCtrl($scope, $state, $firebaseObject, $firebaseArray, $compile, $http, $timeout, $cordovaCamera, $ionicModal ,$ionicPlatform) {
  $scope.client = {};
  var rootRef = firebase.database().ref();
  var arrRef = rootRef.child('simpleClient');
  $scope.testvar = $firebaseArray(arrRef);
  $scope.addClient = function () {
    $scope.testvar.$add({name: $scope.client.name, gender:$scope.client.gender}).then(function(ref) {
      var storageRef = firebase.storage().ref();
      var uploadRef = storageRef.child(ref.key+'.jpg');

      uploadRef.put($scope.picBLOB).then(function(ret){console.log("success")}, function(error){console.log("failed: " + error)});
    });
    $scope.client.name = null;
    $state.go("app.home");
  }



  $scope.toggleCamera = function() {
    if ($scope.client.PICperm) {
    	options = {
    		quality : 25,
    		targetWidth : 1024,
    		targetHeight : 1024,
    		sourceType : 1, // 0:PHOTOLIBRARY, 1:CAMERA, 2:SAVEDPHOTOALBUM
    		correctOrientation : true,
    		destinationType : 0, // 0:DATA_URL, 1:FILE_URI, 2:NATIVE_URI
    		encodingType : 0, // 0:JPEG, 1:PNG
    		allowEdit : false
    	};

    	$ionicPlatform.ready(function () {
    		if (!navigator.camera) {
    			// Load image if unable to get camera
    			console.log("error getting camera");

    		} else {
    			$cordovaCamera.getPicture(options).then(function (imageData) {
    				$scope.picture = "data:image/jpeg;base64," + imageData;
    				var myBLOB = atob(imageData);

            var myBLOBarray = new Array(myBLOB.length);
    				for (var i = 0; i < myBLOB.length; i++) {
    					myBLOBarray[i] = myBLOB.charCodeAt(i);
    				}

    				var myBLOBuint = new Uint8Array(myBLOBarray);

            var picBLOB = new Blob([myBLOBuint], [{contentType : 'image/jpeg'}]);

            $scope.picBLOB = picBLOB;

    			}, function (err) {
    				console.log("Camera Failed: " + err);
    			});
    		}
    	});
    }
  };
  $ionicModal.fromTemplateUrl('pages/agency/vispdatForm.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.vispdatmodal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closevispdatPanel = function() {
    $scope.vispdatmodal.hide();
  };

  // Open the login modal
  $scope.openvispdatPanel = function() {
    $scope.vispdatmodal.show();
  };
};
function loginCtrl($scope, $firebaseObject, $firebaseArray, $compile, $http, $timeout, $cordovaCamera, $ionicPlatform) {
  $scope.loginform = function(){
    console.log($scope.loginData.username);
  }
};
angular.module("SHARKZ").controller("jaysonCtrl", ["$scope", "$state", "$firebaseObject", "$firebaseArray", "$compile", "$http", "$timeout", "$cordovaCamera", "$ionicModal", "$ionicPlatform", jaysonCtrl]),
angular.module("SHARKZ").controller("loginCtrl", ["$scope", "$firebaseObject", "$firebaseArray", "$compile", "$http", "$timeout", "$cordovaCamera", "$ionicPlatform", loginCtrl]);
