var app = angular.module('ruiComponents');

app.directive('ruiCardCreate', function () {
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: 'templates/card-create.html',
    scope: {
      createFn: '&',
      clickFn: '&'
    },
    link: function(scope, element, attrs) {

			scope.onClick = function () {
				scope.editing = true;
				scope.clickFn();
			};

      scope.create = function() {
        scope.createFn({name: scope.createinput});
        scope.editing = false;
      };
    }
  };
});
