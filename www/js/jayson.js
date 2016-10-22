function jaysonCtrl($scope, $firebaseObject, $firebaseArray, $compile, $http, $timeout, Camera, $ionicPlatform) {
  $scope.client = {};
  var rootRef = firebase.database().ref();
  var arrRef = rootRef.child('JaysonSampleClient');
  
  $scope.testvar = $firebaseArray(arrRef);
  $scope.addClient = function () {
    $scope.testvar.$add({name: $scope.client.name, gender:$scope.client.gender}).then(function(ref) {});
    $scope.client.name = null;
  }
  
  $scope.toggleCamera = function() {
    if ($scope.client.PICperm) {
    	options = {
    		quality : 25,
    		targetWidth : 1024,
    		targetHeight : 1024,
    		sourceType : 1, // 0:PHOTOLIBRARY, 1:CAMERA, 2:SAVEDPHOTOALBUM
    		correctOrientation : true,
    		destinationType : 1, // 0:DATA_URL, 1:FILE_URI, 2:NATIVE_URI
    		encodingType : 0, // 0:JPEG, 1:PNG
    		allowEdit : false
    	};

    	$ionicPlatform.ready(function () {
    		if (!navigator.camera) {
    			// Load image if unable to get camera
    			console.log("error getting camera");
    		} else {
    			Camera.getPicture(options).then(function (imagePath) {
    				$scope.picture = imagePath;
    				console.log(imagePath);
    			}, function (err) {
    				console.log("Camera Failed: " + err);
    			});
    		}
    	});
    }
  };
};
angular.module("SHARKZ").controller("jaysonCtrl", ["$scope", "$firebaseObject", "$firebaseArray", "$compile", "$http", "$timeout", "Camera", "$ionicPlatform", jaysonCtrl])
// Factory for initializing Camera Object
.factory('Camera', function($q) {
  return {
    getPicture: function(options) {
      var q = $q.defer();
      navigator.camera.getPicture(function(result) {
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  };
});
