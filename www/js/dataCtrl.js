function dataCtrl($scope, $timeout, $firebaseObject, $firebaseArray) {

	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//$scope.$on('$ionicView.enter', function(e) {
	//});

	$scope.globalref = firebase.database().ref().child("global");

	$scope.myData = $firebaseArray($scope.globalref);

  $scope.countData = function() {
    $scope.tmpasicount = 0;
    $scope.tmpafrcount = 0;
    $scope.tmpcaucount = 0;
    $scope.tmppaccount = 0;
    $scope.tmpnatcount = 0;

    $scope.tmpmale = 0;
    $scope.tmpfemale = 0;
    $scope.tmpothergend = 0;

    $scope.tmparmycount = 0;
    $scope.tmpairfcount = 0;
    $scope.tmpnavycount = 0;
    $scope.tmpmarinecount = 0;
    $scope.tmpcoastgcount = 0;
    $scope.tmpothermilcount = 0;

    $scope.tmpvet = 0;
    $scope.tmpnovet = 0;

    $scope.excldata = 0;
    $scope.gooddata = 0;
    $scope.poordata = 0;

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

      if (item.VeteranStatus === 1) {
        $scope.tmpvet++;

        var mil = item.MilitaryBranch;
        if (mil === 1) {
          $scope.tmparmycount++;
        } else if (mil === 2) {
          $scope.tmpairfcount++;
        } else if (mil === 3) {
          $scope.tmpnavycount++;
        } else if (mil === 4) {
          $scope.tmpmarinecount++;
        } else if (mil === 6) {
          $scope.tmpcoastgcount++;
        } else {
          $scope.tmpothermilcount++;
        }

      } else {
        $scope.tmpnovet++;
      }

      var dataqual = item.DOBDataQuality + item.Name_Data_Quality + item.SSNDataQuality;

      if (dataqual == 3) {
        $scope.excldata++;
      } else if (dataqual > 5 && dataqual < 16) {
        $scope.gooddata++;
      } else {
        $scope.poordata++;
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

    var newMilData = [
      {label: "Army", value: $scope.tmparmycount},
      {label: "Air Force", value: $scope.tmpairfcount},
      {label: "Navy", value: $scope.tmpnavycount},
      {label: "Marines", value: $scope.tmpmarinecount},
      {label: "Coast Guard", value: $scope.tmpcoastgcount},
      {label: "Undisclosed", value: $scope.tmpothermilcount}
    ];

    var newVetData = [{label: "Veteran", value: $scope.tmpvet},{label: "Non-Veteran", value: $scope.tmpnovet}];

    var newQualData = [
      {label: "Excellent", value: $scope.excldata},
      {label: "Good", value: $scope.gooddata},
      {label: "Poor", value: $scope.poordata}
    ];
    if (typeof $scope.grapheth !== "undefined")
      $scope.grapheth.setData(newEthnData);
    if (typeof $scope.graphgend !== "undefined")
      $scope.graphgend.setData(newGendData);
    if (typeof $scope.graphmil !== "undefined")
      $scope.graphmil.setData(newMilData);
    if (typeof $scope.graphvet !== "undefined")
      $scope.graphvet.setData(newVetData);
    if (typeof $scope.graphqual !== "undefined")
      $scope.graphqual.setData(newQualData);
  };

  $scope.$watch("myData", function(newValue, oldValue) {
    $scope.myData = newValue;
    $scope.countData();
  }, true);

	$scope.myData.$loaded().then(function (globaldata) {

		var dataeth = [{
				label : "Asian",
				value : 1
			}, {
				label : "African",
				value : 1
			}, {
				label : "Caucasian",
				value : 1
			}, {
				label : "Pacific Islander",
				value : 1
			}, {
				label : "Native American",
				value : 1
			}
		];

		$scope.grapheth = new Morris.Donut({
      element : 'chartone',
      data : dataeth,
  backgroundColor: '#fff',
  labelColor: '#535353',
  colors: [
    '#64bf67',
    '#ddd0a9',
    '#7dc17f',
    '#ded878'
  ],
    });

		var datagend = [{
      label : 'male',
      value : 1
    }, {
      label : 'female',
      value : 1
    }];

		$scope.graphgend = new Morris.Donut({
      element : 'charttwo',
      data : datagend,
  backgroundColor: '#fff',
  labelColor: '#535353',
  colors: [
    '#64bf67',
    '#ddd0a9',
    '#7dc17f',
    '#ded878'
  ],
    });

		var datamil = [{
      label : "test",
      value : 1
    }];

		$scope.graphmil = new Morris.Bar({
      element : 'chartthree',
      data : datamil,
      xkey : 'label',
      ykeys : ['value'],
      labels : ['number'],
      hideHover : true,
  backgroundColor: '#fff',
  labelColor: '#535353',
  colors: [
    '#64bf67',
    '#ddd0a9',
    '#7dc17f',
    '#ded878'
  ],
    });

		var datavet = [{
      label : "test",
      value : 1
    }];

		$scope.graphvet = new Morris.Donut({
      element : 'chartfour',
      data : datavet,
      xkey : 'label',
      ykeys : ['value'],
      labels : ['status'],
      hideHover : true,
      backgroundColor: '#fff',
      labelColor: '#535353',
      colors: [
      '#64bf67',
      '#ddd0a9',
      '#7dc17f',
      '#ded878'
      ],
    });

    var dataqual = [{
      label : "test",
      value : 1
    }];

    $scope.graphqual = new Morris.Bar({
      element: 'chartfive',
      data: dataqual,
      xkey: 'label',
      ykeys: ['value'],
      labels: ['quality'],
      hideHover: true
    });

    $scope.graphservices = new Morris.Line({
      element: 'chartsix',
      data: datahous,
      xkey: 'label',
      ykeys: ['intake','completed'],
      labels: ['intake','completed'],
      xLabelFormat: function(x) {
        console.log(x.getMonth());
        if(x.getMonth() === 0) return "Jan";
        else if(x.getMonth() === 1) return "Feb";
        else if(x.getMonth() === 2) return "Mar";
        else if (x.getMonth() === 3) return "Apr";
        else if (x.getMonth() === 4) return "May";
        else if (x.getMonth() === 5) return "Jun";
        else if (x.getMonth() === 6) return "Jul";
        else if (x.getMonth() === 7) return "Aug";
        else if (x.getMonth() === 8) return "Sep";
        else if (x.getMonth() === 9) return "Oct";
        else if (x.getMonth() === 10) return "Nov";
        else return "Dec";
      },
      hideHover: 'always'
    });
    
    var randnum = Math.random()*50
    var datafunds = [
      {label: "Available", value: Math.round(randnum)},
      {label: "Used", value: Math.round(100 - randnum)}
    ]
    
    $scope.graphfunds = new Morris.Donut({
      element : 'chartseven',
      data : datafunds,
      xkey : 'label',
      ykeys : ['value'],
      labels : ['%'],
      hideHover : true
    });
	});
  
  var datahous = [
      {label : "2016-01", intake : 10, completed: 9},
      {label : "2016-02", intake : 13, completed: 10},
      {label : "2016-03", intake : 11, completed: 13},
      {label : "2016-04", intake : 16, completed: 14},
      {label : "2016-05", intake : 12, completed: 11},
      {label : "2016-06", intake : 19, completed: 16},
      {label : "2016-07", intake : 13, completed: 18},
      {label : "2016-08", intake : 22, completed: 13},
      {label : "2016-09", intake : 14, completed: 20},
      {label : "2016-10", intake : 15, completed: 21},
      {label : "2016-11", intake : 18, completed: 19},
      {label : "2016-12", intake : 25, completed: 26}
  ];
  
  var datamedi = [
      {label : "2016-01", intake : 13, completed: 10},
      {label : "2016-02", intake : 10, completed: 9},
      {label : "2016-03", intake : 16, completed: 14},
      {label : "2016-04", intake : 11, completed: 13},
      {label : "2016-05", intake : 19, completed: 11},
      {label : "2016-06", intake : 12, completed: 16},
      {label : "2016-07", intake : 22, completed: 18},
      {label : "2016-08", intake : 13, completed: 13},
      {label : "2016-09", intake : 15, completed: 18},
      {label : "2016-10", intake : 14, completed: 15},
      {label : "2016-11", intake : 21, completed: 19},
      {label : "2016-12", intake : 20, completed: 21}
  ];
  
  var dataempl = [
      {label : "2016-01", intake : 20, completed: 9},
      {label : "2016-02", intake : 21, completed: 10},
      {label : "2016-03", intake : 23, completed: 15},
      {label : "2016-04", intake : 20, completed: 14},
      {label : "2016-05", intake : 15, completed: 13},
      {label : "2016-06", intake : 16, completed: 16},
      {label : "2016-07", intake : 18, completed: 20},
      {label : "2016-08", intake : 10, completed: 14},
      {label : "2016-09", intake : 9, completed: 15},
      {label : "2016-10", intake : 13, completed: 18},
      {label : "2016-11", intake : 5, completed: 16},
      {label : "2016-12", intake : 2, completed: 22}
  ];
  
  var dataserv = [
      {label : "2016-01", intake : 20, completed: 9},
      {label : "2016-02", intake : 23, completed: 10},
      {label : "2016-03", intake : 21, completed: 13},
      {label : "2016-04", intake : 14, completed: 13},
      {label : "2016-05", intake : 12, completed: 11},
      {label : "2016-06", intake : 7, completed: 16},
      {label : "2016-07", intake : 14, completed: 18},
      {label : "2016-08", intake : 12, completed: 19},
      {label : "2016-09", intake : 16, completed: 20},
      {label : "2016-10", intake : 18, completed: 21},
      {label : "2016-11", intake : 20, completed: 16},
      {label : "2016-12", intake : 19, completed: 23}
  ];
  
  $scope.showHousing = function() {
    $scope.graphservices.setData(datahous);
  }
  
  $scope.showMedical = function() {
    $scope.graphservices.setData(datamedi);
  }
  
  $scope.showEmployment = function() {
    $scope.graphservices.setData(dataempl);
  }
  
  $scope.showServices = function() {
    $scope.graphservices.setData(dataserv);
  }
  
  $scope.showMonth = function() {
    var randnum = Math.random()*50
    var datafunds = [
      {label: "Available", value: Math.round(randnum)},
      {label: "Used", value: Math.round(100 - randnum)}
    ]
    $scope.graphfunds.setData(datafunds);
  }
};

angular.module("SHARKZ").controller("dataCtrl", ["$scope", "$timeout", "$firebaseObject", "$firebaseArray", dataCtrl]);

function agencyDataCtrl($scope, $timeout, $firebaseObject, $firebaseArray) {

	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//$scope.$on('$ionicView.enter', function(e) {
	//});

	$scope.globalref = firebase.database().ref().child("global");

	$scope.myData = $firebaseArray($scope.globalref);

  $scope.countData = function() {
    $scope.tmpasicount = 0;
    $scope.tmpafrcount = 0;
    $scope.tmpcaucount = 0;
    $scope.tmppaccount = 0;
    $scope.tmpnatcount = 0;

    $scope.tmpmale = 0;
    $scope.tmpfemale = 0;
    $scope.tmpothergend = 0;

    $scope.tmparmycount = 0;
    $scope.tmpairfcount = 0;
    $scope.tmpnavycount = 0;
    $scope.tmpmarinecount = 0;
    $scope.tmpcoastgcount = 0;
    $scope.tmpothermilcount = 0;

    $scope.tmpvet = 0;
    $scope.tmpnovet = 0;

    $scope.excldata = 0;
    $scope.gooddata = 0;
    $scope.poordata = 0;

    $scope.agencyCases = 0;

    $scope.myData.forEach(function(item) {
      if (item.Agencies == "St. Patrick") {
        $scope.agencyCases++;
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

      	if (item.VeteranStatus === 1) {
      		$scope.tmpvet++;

      		var mil = item.MilitaryBranch;
      		if (mil === 1) {
      			$scope.tmparmycount++;
      		} else if (mil === 2) {
      			$scope.tmpairfcount++;
      		} else if (mil === 3) {
      			$scope.tmpnavycount++;
      		} else if (mil === 4) {
      			$scope.tmpmarinecount++;
      		} else if (mil === 6) {
      			$scope.tmpcoastgcount++;
      		} else {
      			$scope.tmpothermilcount++;
      		}

      	} else {
      		$scope.tmpnovet++;
      	}

      	var dataqual = item.DOBDataQuality + item.Name_Data_Quality + item.SSNDataQuality;

      	if (dataqual == 3) {
      		$scope.excldata++;
      	} else if (dataqual > 5 && dataqual < 16) {
      		$scope.gooddata++;
      	} else {
      		$scope.poordata++;
      	}
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

    var newMilData = [
      {label: "Army", value: $scope.tmparmycount},
      {label: "Air Force", value: $scope.tmpairfcount},
      {label: "Navy", value: $scope.tmpnavycount},
      {label: "Marines", value: $scope.tmpmarinecount},
      {label: "Coast Guard", value: $scope.tmpcoastgcount},
      {label: "Undisclosed", value: $scope.tmpothermilcount}
    ];

    var newVetData = [{label: "Veteran", value: $scope.tmpvet},{label: "Non-Veteran", value: $scope.tmpnovet}];

    var newQualData = [
      {label: "Excellent", value: $scope.excldata},
      {label: "Good", value: $scope.gooddata},
      {label: "Poor", value: $scope.poordata}
    ];

    if (typeof $scope.grapheth !== "undefined")
      $scope.grapheth.setData(newEthnData);
    if (typeof $scope.graphgend !== "undefined")
      $scope.graphgend.setData(newGendData);
    if (typeof $scope.graphmil !== "undefined")
      $scope.graphmil.setData(newMilData);
    if (typeof $scope.graphvet !== "undefined")
      $scope.graphvet.setData(newVetData);
    if (typeof $scope.graphqual !== "undefined")
      $scope.graphqual.setData(newQualData);
  };

  $scope.$watch("myData", function(newValue, oldValue) {
    $scope.myData = newValue;
    $scope.countData();
  }, true);

	$scope.myData.$loaded().then(function (globaldata) {

		var dataeth = [{
				label : "Asian",
				value : 1
			}, {
				label : "African",
				value : 1
			}, {
				label : "Caucasian",
				value : 1
			}, {
				label : "Pacific Islander",
				value : 1
			}, {
				label : "Native American",
				value : 1
			}
		];

		$scope.grapheth = new Morris.Donut({
      element : 'achartone',
      data : dataeth,
  backgroundColor: '#fff',
  labelColor: '#535353',
  colors: [
    '#64bf67',
    '#ddd0a9',
    '#7dc17f',
    '#ded878'
  ],
    });

		var datagend = [{
      label : 'male',
      value : 1
    }, {
      label : 'female',
      value : 1
    }];

		$scope.graphgend = new Morris.Donut({
      element : 'acharttwo',
      data : datagend,
  backgroundColor: '#fff',
  labelColor: '#535353',
  colors: [
    '#64bf67',
    '#ddd0a9',
    '#7dc17f',
    '#ded878'
  ],
    });

		var datamil = [{
      label : "test",
      value : 1
    }];

		$scope.graphmil = new Morris.Bar({
      element : 'achartthree',
      data : datamil,
      xkey : 'label',
      ykeys : ['value'],
      labels : ['number'],
      hideHover : true,
  backgroundColor: '#fff',
  labelColor: '#535353',
  colors: [
    '#64bf67',
    '#ddd0a9',
    '#7dc17f',
    '#ded878'
  ],
    });

		var datavet = [{
      label : "test",
      value : 1
    }];

		$scope.graphvet = new Morris.Donut({
      element : 'achartfour',
      data : datavet,
      xkey : 'label',
      ykeys : ['value'],
      labels : ['status'],
      hideHover : true,
  backgroundColor: '#fff',
  labelColor: '#535353',
  colors: [
    '#64bf67',
    '#ddd0a9',
    '#7dc17f',
    '#ded878'
  ],
    });

    var dataqual = [{
      label : "test",
      value : 1
    }];

    $scope.graphqual = new Morris.Bar({
      element: 'achartfive',
      data: dataqual,
      xkey: 'label',
      ykeys: ['value'],
      labels: ['quality'],
      hideHover: true,
  backgroundColor: '#fff',
  labelColor: '#535353',
  colors: [
    '#64bf67',
    '#ddd0a9',
    '#7dc17f',
    '#ded878'
  ],
    });

	});

};

angular.module("SHARKZ").controller("agencyDataCtrl", ["$scope", "$timeout", "$firebaseObject", "$firebaseArray", agencyDataCtrl]);
