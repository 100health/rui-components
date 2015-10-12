// Show/hide spinner
var app = angular.module('ruiComponents');

app.directive('ruiSpinner', function () {

  return {
    restrict: 'E',
    scope: {
      color: '@'
    },
    templateUrl: 'templates/spinner.html'
  };

});
