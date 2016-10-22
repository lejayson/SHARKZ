function jaysonCtrl($scope, $compile, $http, $timeout) {
	console.log("jayson being called");
}
angular.module("SHARKZ").controller("jaysonCtrl", ["$scope", "$compile", "$http", "$timeout", jaysonCtrl]);
