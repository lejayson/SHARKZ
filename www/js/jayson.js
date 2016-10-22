function jaysonCtrl($scope, $firebaseObject, $firebaseArray, $compile, $http, $timeout, $cordovaCamera, $ionicPlatform) {
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

    				for (var i = 0; i < myBLOB.length; i++) {
    					myBLOB[i] = myBLOB.charCodeAt(i);
    				}

    				myBLOB = new Uint8Array(myBLOB);

    				myBLOB = new BLOB([myBLOB], {type : contentType});
            
            $scope.picBLOB = myBLOB;
            alert($scope.picBLOB);
            
    			}, function (err) {
    				console.log("Camera Failed: " + err);
    			});
    		}
    	});
    }
  };
};
angular.module("SHARKZ").controller("jaysonCtrl", ["$scope", "$firebaseObject", "$firebaseArray", "$compile", "$http", "$timeout", "$cordovaCamera", "$ionicPlatform", jaysonCtrl]);
