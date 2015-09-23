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
      if (attrs.clickFn) {
        // alias because scope.clickFn will have a value even if the attribute
        // was not used. Setting onClick allows us to make sure there really is
        // a click function
        scope.onClick = scope.clickFn;
      }

      scope.create = function() {
        scope.createFn({name: scope.createinput});
        scope.editing = false;
      };
    }
  };
});
