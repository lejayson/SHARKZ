function dataCtrl($scope, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  var dataone = [{name: 0, number: 1}];
  
  var graphone = new Morris.Bar({
    
    element: 'chartone',
    data: dataone,
    xkey: 'name',
    ykeys: ['number'],
    labels: ['val'],
    hideHover: 'always'
  });
}

angular.module("SHARKZ").controller("dataCtrl", ["$scope", "$timeout", dataCtrl]);