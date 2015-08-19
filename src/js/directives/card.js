var app = angular.module('ruiComponents');

app.directive('ruiCard', ['$compile', function ($compile) {
	return {
		restrict: 'E',
    transclude: true,
    templateUrl: 'templates/card.html',
		scope: {
      ref: "@",
			refstate: "=",
			refdata: "@"
    },
    link: function(scope, element, attrs){
			console.log("===========")
			console.log("scope.ref")
			console.log(scope.ref)
			console.log("scope.refstate")
			console.log(scope.refstate)
			console.log("scope.refdata")
			console.log(scope.refdata)
    }
	};
}]);
