var app = angular.module('ruiComponents');

app.directive('ruiTooltip', function($document, $compile) {
  return {
    restrict: 'A',
    scope: true,
    link: function(scope, element, attrs) {
      var html = '<div class="rui-tooltip">{{ text }}</div>';
      var tooltip = $compile(html)(scope);

      scope.text = attrs.ruiTooltip;

      $document.find('body').append(tooltip);

      element.bind('mouseover', function(e) {
        tooltip.addClass('rui-tooltip-show');

        //find the container of our element so that we can position our tooltip
        var containerPosition = e.target.getBoundingClientRect(),
          offset = {}, // = tooltip.offset(),
          tooltipHeight = tooltip.outerHeight(),
          topOffset = containerPosition.top + window.pageYOffset; //account for scrolling of the window
          console.log(tooltipHeight);
        offset.top = topOffset - (containerPosition.height / 2) - tooltipHeight;
        offset.left = containerPosition.left + (containerPosition.width / 2) - 31;

        tooltip.offset(offset);
      });

      element.bind('mouseout', function() {
        tooltip.removeClass('rui-tooltip-show');
      });

      //keep tooltip active if hovering over its contents
      tooltip.bind('mouseover', function() {
        tooltip.addClass('rui-tooltip-show');
      });

      tooltip.bind('mouseout', function() {
        tooltip.removeClass('rui-tooltip-show');
      });
    }
  };
});
