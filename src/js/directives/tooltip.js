var app = angular.module('ruiComponents');

app.directive('ruiTooltip', [function() {
  return {
    restrict: 'A',
    scope: {
      message: '@',
      data: '='
    },
    transclude: true,
    replace: true,
    templateUrl: 'templates/tooltip.html',

    link: function(scope, element, attrs, ctrl, linker) {
      if (scope.data) {
        scope.message = scope.data;
      }
    }
  };
}]);
