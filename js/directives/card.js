var app = angular.module('ruiComponents');

app.directive('ruiCard', ['$compile', function ($compile) {
	return {
		restrict: 'E',
    transclude: true,
    templateUrl: 'templates/card.html',
		scope: {
      ref: "@"
    },
    link: function(scope, element, attrs){

    }
	};
}]);
