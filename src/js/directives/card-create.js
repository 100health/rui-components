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
        // check attrs since scope.clickFn is truthy even if the attribute is not set
        if (attrs.clickFn) {
          scope.clickFn();
        } else {
          scope.editing = true;
        }
      };

      scope.create = function() {
        scope.createFn({name: scope.createinput});
        scope.editing = false;
      };
    }
  };
});
