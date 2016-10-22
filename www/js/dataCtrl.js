function dataCtrl($scope, $timeout, $firebaseObject, $firebaseArray) {

	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//$scope.$on('$ionicView.enter', function(e) {
	//});
  $scope.asicount = 0;
  $scope.afrcount = 0;
  $scope.caucount = 0;
  $scope.paccount = 0;
  $scope.natcount = 0;
  
	$scope.globalref = firebase.database().ref().child("global");

	$scope.myData = $firebaseArray($scope.globalref);
  
  $scope.countEthnicities = function() {
    $scope.tmpasicount = 0;
    $scope.tmpafrcount = 0;
    $scope.tmpcaucount = 0;
    $scope.tmppaccount = 0;
    $scope.tmpnatcount = 0;
    
    $scope.tmpmale = 0;
    $scope.tmpfemale = 0;
    $scope.tmpothergend = 0;
    
    $scope.myData.forEach(function(item) {
      if (item.Asian === 1) {
        $scope.tmpasicount++;
      }
      if (item.Black === 1) {
        $scope.tmpafrcount++;
      }
      if (item.White === 1) {
        $scope.tmpcaucount++;
      }
      if (item.NativeHIOtherPacific === 1) {
        $scope.tmppaccount++;
      }
      if (item.AmIndAKNative === 1) {
        $scope.tmpnatcount++;
      }
      
      if (item.Gender === 1) {
        $scope.tmpmale++;
      } else if (item.Gender === 0) {
        $scope.tmpfemale++;
      } else {
        $scope.tmpothergend++;
      }
    });
    
    var newEthnData = [{
				label : "Asian",
				value : $scope.tmpasicount
			}, {
				label : "African",
				value : $scope.tmpafrcount
			}, {
				label : "Caucasian",
				value : $scope.tmpcaucount
			}, {
				label : "Pacific Islander",
				value : $scope.tmppaccount
			}, {
				label : "Native American",
				value : $scope.tmpnatcount
			}
		];
    
    var newGendData = [{label: "Male", value: $scope.tmpmale},{label: "Female", value: $scope.tmpfemale},{label: "Other", value: $scope.tmpothergend}];
    
    $scope.graphone.setData(newEthnData);
    $scope.graphtwo.setData(newGendData);
  };
  
  $scope.$watch("myData", function(newValue, oldValue) {
    $scope.myData = newValue;
    $scope.countEthnicities();
  }, true);

	$scope.myData.$loaded().then(function (globaldata) {
    
		var dataone = [{
				label : "Asian",
				value : $scope.asicount
			}, {
				label : "African",
				value : $scope.afrcount
			}, {
				label : "Caucasian",
				value : $scope.caucount
			}, {
				label : "Pacific Islander",
				value : $scope.paccount
			}, {
				label : "Native American",
				value : $scope.natcount
			}
		];

		$scope.graphone = new Morris.Donut({
      element : 'chartone',
      data : dataone
    });

		var datatwo = [{
      label : 'male',
      value : 1
    }, {
      label : 'female',
      value : 1
    }];

		$scope.graphtwo = new Morris.Donut({
      element : 'charttwo',
      data : datatwo
    });

		var datathree = [{
      name : 0,
      number : 1
    }];

		var graphthree = new Morris.Bar({
      element : 'chartthree',
      data : datathree,
      xkey : 'name',
      ykeys : ['number'],
      labels : ['val'],
      hideHover : 'always'
    });

		var datafour = [{
      name : 0,
      number : 1
    }];

		var graphfour = new Morris.Bar({
      element : 'chartthree',
      data : datafour,
      xkey : 'name',
      ykeys : ['number'],
      labels : ['val'],
      hideHover : 'always'
    });

	});

};

angular.module("SHARKZ").controller("dataCtrl", ["$scope", "$timeout", "$firebaseObject", "$firebaseArray", dataCtrl]);