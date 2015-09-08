var app = angular.module('ruiComponents');

app.directive('ruiTooltip', ['$compile', function ($compile) {
	return {
		restrict: 'A',
		scope: {
      message: '@',
      data: '='
    },
    transclude: "element",
    replace: true,
    templateUrl: 'templates/tooltip.html',

    link: function(scope, element, attrs, ctrl, linker){
      if (scope.data){
        scope.message = scope.data;
      }
    }
	};
}]);
