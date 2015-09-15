var app = angular.module('ruiComponents');

app.directive('ruiTooltip', function($document, $compile) {
  return {
    restrict: 'A',
    scope: {
      ruiTooltip: "@"
    },
    link: function(scope, element, attrs) {
      var html = '<div class="rui-tooltip">{{ ruiTooltip }}</div>';
      var tooltip = $compile(html)(scope);

      $document.find('body').append(tooltip);

      element.bind('mouseover', function(e) {
        tooltip.addClass('rui-tooltip-show');

        //find the container of our element so that we can position our tooltip
        var containerPosition = e.target.getBoundingClientRect(),
          offset = {},
          tooltipHeight = tooltip.outerHeight(),
          topOffset = containerPosition.top + window.pageYOffset; //account for scrolling of the window

        offset.top = topOffset - tooltipHeight - 10; //-10 for the down arrow
        offset.left = containerPosition.left + (containerPosition.width / 2) - 30; //-31 for the tip of the arrow

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

      element.on('$destroy', function() {
        tooltip.remove();
      });
    }
  };
});
