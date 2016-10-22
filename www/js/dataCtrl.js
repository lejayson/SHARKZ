function dataCtrl($scope, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  
  
  var dataone = [{label: "Asian", value: 1}, {label: "African", value: 1}, {label: "Caucasian", value: 1}, {label: "Pacific Islander", value: 1}, {label: "Native American", value: 1}];
  
  var graphone = new Morris.Donut({
    element: 'chartone',
    data: dataone
  });
  
  var datatwo = [{label: 'male', value: 1},{label: 'female', value: 1}];
  
  var graphtwo = new Morris.Donut({
    element: 'charttwo',
    data: datatwo
  });
  
  var datathree = [{name: 0, number: 1}];
  
  var graphthree = new Morris.Bar({
    
    element: 'chartthree',
    data: datathree,
    xkey: 'name',
    ykeys: ['number'],
    labels: ['val'],
    hideHover: 'always'
  });
  
  var datafour = [{name: 0, number: 1}];
  
  var graphfour = new Morris.Bar({
    
    element: 'chartthree',
    data: datafour,
    xkey: 'name',
    ykeys: ['number'],
    labels: ['val'],
    hideHover: 'always'
  });
}

angular.module("SHARKZ").controller("dataCtrl", ["$scope", "$timeout", dataCtrl]);