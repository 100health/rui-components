angular.module('ruiComponents', ['truncate', 'mgcrea.ngStrap']);

angular.module('ruiComponents')
  .controller('ruiAppController', ['$scope', function($scope){

    // Buttons
    $scope.clickCnt = 0;
    $scope.incrementClickCnt = function (msg) {
      $scope.clickCnt++;
    };

    $scope.dropdownOptions = [ 'abc', 'def', 'ghi', 'jkl'];
    $scope.dropdownSelection = $scope.dropdownOptions[1];


    // Help Text
    $scope.helptextdata="data from controller";

    // Cards
    $scope.samplecreate = function(name){
      alert('create ' + name)
    };

    // Alert
    var counter = 0; // counter shows we're displaying most recent alert message in directive
    $scope.toggleAlert = function () {
      $scope.alert = $scope.alert
        ? null
        : { title: 'OMG', message: 'tragic alert ' + counter++ };
    };
    $scope.toggleAlert();

    // Chips
    $scope.tags = [
      { name: 'one', color: 'orange' },
      { name: 'two', color: 'rgb(0, 100, 200)' },
      { name: 'three', color: '#44FF99' }
    ];

    $scope.removeTag = function (tag, tagIx) {
      if (tagIx >= 0 && tagIx < $scope.tags.length) {
        $scope.tags.splice(tagIx, 1);
      }
      // save change to server
      // ...
    };

    var randomColor = function () {
      var rand256 = function () {
        return Math.floor(Math.random() * 256);
      };

      return 'rgb(' + [
        rand256(),
        rand256(),
        rand256()
      ].join(',') + ')';
    };

    var autoTagCnt = 0;
    $scope.addTag = function () {
      $scope.tags.push({
        name: 'autoTag' + autoTagCnt++,
        color: randomColor()
      });
    };

    // Toggle
    $scope.toggle1 = false;
    $scope.toggle2 = 'on';

    $scope.toggleCount = 0;

    $scope.incrementToggleCount = function () {
      $scope.toggleCount++;
    };

    $scope.logToggle = function () {
      console.log($scope.toggleTestForm);
    };

    // Spinner
    $scope.showInlineSpinner = true;
    $scope.showFullScreenSpinner = false;
    $scope.spinnerText = "great big spinner";

    $scope.glimpseFullScreenSpinner = function () {
      $scope.showFullScreenSpinner = true;

      // since spinner blocks the toggle button, must detoggle programatically
      setTimeout(function () {
        $scope.showFullScreenSpinner = false;
        $scope.$apply();
      }, 3000);
    };

    // Sidenav
    $scope.sidenavData = {
      style: 'Navbar',
      breadcrumb:{
        state: 'devtools.index',
        title: 'Dev Tools',
        previousState: 'application.index',
        previousStateTitle: 'My App'
      },
      sections:[
        {
          title: 'Application',
          state: 'dashboard.organization.index({orgId: session.organization.id})',
          icon: 'ion-monitor'
        },{
          title: 'Settings',
          state: 'dashboard.organization.index',
          icon: 'ion-settings',
          hide: false    //'!session.currentUser().admin'
        },{
          title: 'FAQ',
          href: 'http://faq.redoxengine.com',
          icon: 'ion-help-circled'
        }
      ]
    }



  }]);

var app = angular.module('ruiComponents');

app.directive('ruiAlert', [function () {

  return {
    restrict: 'E',
    templateUrl: 'templates/alert.html',
    scope: {
      message: '=', // REQUIRED
      title: '=',
      type: '=',    // 'danger' (default), 'warning', 'info', 'success'
      showContact: '=',
    }
  };
}]);
var app = angular.module('ruiComponents');

app.directive('ruiComponents', function () {
	return {
		restrict: 'E',
		templateUrl: 'templates/_all.html',
		replace: true
	};
});
var app = angular.module('ruiComponents');

app.directive('ruiButton', function () {

	return {
		restrict: 'E',
		templateUrl: 'templates/button.html',
		replace: true,
    transclude: true,
    scope: {},
    link: function (scope, element, attrs) {
      // allow presence of attribute to flag as primary, etc.
      ['primary', 'secondary', 'default'].forEach(function (level) {
        if (attrs.hasOwnProperty(level)) {
          scope[level] = attrs[level] !== 'false'; // respect primary="false"
        }
      });
    }
	};
});
var app = angular.module('ruiComponents');

app.directive('ruiCardCreate', ['$compile', function ($compile) {
	return {
		restrict: 'E',
    transclude: true,
    templateUrl: 'templates/card-create.html',
		scope: {
      createFn: "&"
    },
    link: function($scope, $element, $attrs){
      $scope.create = function(){
        $scope.createFn({name: $scope.createinput});
        $scope.editing = false;
      }
    }
	};
}]);

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

var app = angular.module('ruiComponents');

app.directive('ruiChip', [function () {

  return {
    restrict: 'E',
    templateUrl: 'templates/chip.html',
    scope: {
      name: '=',
      backgroundColor: '=color',
      onRemove: '&',
    },
    link: function (scope, element, attrs) {
      scope.style = {
        'background-color': scope.backgroundColor
      };

      // adjust text color depending on background brightness
      if (window.tinycolor) {
        var dark = 'black', light = 'white';
        var isDark = window.tinycolor(scope.backgroundColor).isDark();

        scope.style.color = isDark ? light : dark;

        // also make sure closing button (X) matches
        scope.closeStyle = {
          color: scope.style.color,
          'text-shadow': '0 1px 0 ' + (isDark ? dark : light)
        };
      }
    }
  };
}]);
var app = angular.module('ruiComponents');

app.directive('ruiFullscreen', function () {

  return {
    restrict: 'A',
    transclude: true,
    replace: true,
    templateUrl: 'templates/fullscreen.html',
    scope: {
      top: '@top',
      left: '@left'
    },
    link: function (scope, element, attrs) {
      scope.position = {
        height: 'calc(100%' + (attrs.top ? (' - ' + attrs.top) : '')  + ')',
        width: 'calc(100%' + (attrs.left ? (' - ' + attrs.left) : '') + ')',
        top: attrs.top || 0,
        left: attrs.left || 0
      };
    }
  };
});
var app = angular.module('ruiComponents');

app.directive('ruiHelptext', ['$compile', function ($compile) {
	return {
		restrict: 'A',
		scope: {
      message: '@',
      data: '='
    },
    link: function(scope, element, attrs, ctrl, linker){
      if (scope.data){
        scope.message = scope.data;
      }
      element.append('<span ng-include="\'templates/helptext.html\'"></span>');
      $compile(element.contents())(scope);
    }
	};
}]);

var app = angular.module('ruiComponents');

app.directive('ruiEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});


/*
Data Structure for Side Nav

Sidenavs come in 1 form: 'Navbar'

Example 1: Navbar

data = {
  style: 'Navbar',
  breadcrumb:{
    state: 'devtools.index',
    title: 'Dev Tools',
    previousState: 'application.state',
    previousStateTitle: 'My App'
  },
  sections:[
    {
      title: 'Application',
      state: 'dashboard.organization.index({orgId: session.organization.id})',
      icon: 'ion-monitor'
    },{
      title: 'Settings',
      state: 'dashboard.organization.index({orgId: session.organization.id})',
      icon: 'ion-settings',
      hide: '!session.currentUser().admin'
    },{
      title: 'FAQ',
      href: 'http://faq.redoxengine.com',
      icon: 'ion-help-circled'
    }
  ]
}

 For Table of Contents style navbars, (As used in Redox Docs/DataModels) Holding off for now - waiting for additional use cases.

*/

var app = angular.module('ruiComponents');


app.directive('ruiSidenav', ['$compile', function ($compile) {
  return {
    restrict: 'AE',
    scope: {
      data: '='
    },
    link: function(scope, element, attrs, ctrl, linker){

      scope.sidenavData = scope.data;
      for (i = 0 ;i < scope.sidenavData.sections.length; i++){
        if (scope.sidenavData.sections[i].state){
          scope.sidenavData.sections[i].statename = scope.sidenavData.sections[i].state.toString().split("(")[0];
        }
      }
      element.append('<div ng-include="\'templates/sidenav.html\'"></div>');
      $compile(element.contents())(scope);
    }
  };
}]);

var app = angular.module('ruiComponents');

app.directive('ruiFullscreenSpinner', function () {
  return {
    restrict: 'E',
    templateUrl: 'templates/spinner-fullscreen.html',
    scope: {
      text: '=',
      top: '@',
      left: '@'
    }
  };
});
// Show/hide spinner
var app = angular.module('ruiComponents');

app.directive('ruiSpinner', function () {

  return {
    restrict: 'E',
    templateUrl: 'templates/spinner.html'
  };

});

var app = angular.module('ruiComponents');

app.directive('ruiToggle', ['$compile' ,function ($compile) {

  return {
    restrict: 'A',
    link: function (scope, element, attrs) {

      // Wrap input in span and associate with label
      var $input = element;
      $input.wrap(angular.element('<span class="rui-toggle">'));

      var $wrapper = $input.parent(); // must save $wrapper after $input wrapped

      var $label = angular.element('<label>');
      $wrapper.append($label);

      // Update attributes
      if (attrs.type !== 'checkbox') {
        // cannot dynamically change input type so log an error
        console.error('<input> must be of type "checkbox" to use rui-toggle');
      }

      if (attrs.id) {
        $label.attr('for', attrs.id);
      } else {
        console.error('<input> must have id attribute to use rui-toggle');
      }

      // move on and off text to label
      if (attrs.onText) {
        $label.attr('data-on', attrs.onText);
        $input.removeAttr('on-text');
      }

      if (attrs.offText) {
        $label.attr('data-off', attrs.offText);
        $input.removeAttr('off-text');
      }

      // move disabled flag to span so cursor displays correctly
      if (attrs.ngDisabled) {
        $wrapper.attr('ng-disabled', attrs.ngDisabled);
      }

      $input.removeAttr('rui-toggle'); // prevent infinite recursion
      $compile($wrapper)(scope);
    }
  };
}]);
var app = angular.module('ruiComponents');

app.directive('ruiTooltip', ["$document", "$compile", function($document, $compile) {
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
}]);

angular.module('ruiComponents').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/_all.html',
    "<div ng-controller=\"ruiAppController\" style=\"width:1000px;margin:auto;\">\n" +
    "  <h1>The Definitive Redox UI Component Handbook <br>\n" +
    "    <small>Demonstrations of and Guidelines for the Various and Assorted Wonders of the Redox UI</small>\n" +
    "  </h1>\n" +
    "\n" +
    "  <div>\n" +
    "    <h2 class=\"page-header\">Getting Started</h2>\n" +
    "    <p>\n" +
    "      First get the components: <code>bower install rui-components</code>\n" +
    "    </p>\n" +
    "    <p>\n" +
    "      Then, make sure you have the dependencies:\n" +
    "    </p>\n" +
    "    <ul>\n" +
    "      <li>Angular</li>\n" +
    "      <li>Bootstrap</li>\n" +
    "      <li>Ionicons</li>\n" +
    "      <li>Tinycolor (for rui-chips)</li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "\n" +
    "  <div>\n" +
    "    <h2 class=\"page-header\">Buttons: <code>rui-button</code></h2>\n" +
    "    <p>\n" +
    "      We have three standard types of buttons:\n" +
    "    </p>\n" +
    "    <rui-button primary ng-click=\"incrementClickCnt()\">Primary</rui-button>\n" +
    "    <rui-button secondary ng-click=\"incrementClickCnt()\">Secondary</rui-button>\n" +
    "    <rui-button ng-click=\"incrementClickCnt()\">Default</rui-button>\n" +
    "    <p>\n" +
    "      Use primary for the primary action(s) the user will want to take on a page: e.g. submitting a form. Use secondary for the actions you user might want to take but that are not the primary actions on a page. Use default for everything else, which should be most things.\n" +
    "    </p>\n" +
    "    <p>\n" +
    "      Using primary or secondary is a recommendation to the user, so don't place them side by side. That's confusing. If paired with another button (e.g. save, cancel), the other button should be the default style.\n" +
    "    </p>\n" +
    "    <p>\n" +
    "      Indicate which type of button you want by adding a <code>primary</code> or <code>secondary</code> attribute, or leaving them off to get the default styling:\n" +
    "    </p>\n" +
    "    <pre ng-non-bindable>\n" +
    "      <code data-language=\"html\">\n" +
    "        Coming soon...\n" +
    "      </code>\n" +
    "    </pre>\n" +
    "    <p>\n" +
    "      Use <code>ng-click</code> as usual to register click handlers. Clicking any of the buttons in this section increments the click count: {{clickCnt}}\n" +
    "    </p>\n" +
    "    <p>\n" +
    "      Disable a button with <code>ng-disable</code>, as you would a normal button. Each style button looks different when disabled:\n" +
    "    </p>\n" +
    "    <rui-button primary\n" +
    "                ng-click=\"incrementClickCnt()\"\n" +
    "                ng-disabled=\"!enableButtons\">\n" +
    "      Primary\n" +
    "    </rui-button>\n" +
    "    <rui-button secondary\n" +
    "                ng-click=\"incrementClickCnt()\"\n" +
    "                ng-disabled=\"!enableButtons\">\n" +
    "      Secondary\n" +
    "    </rui-button>\n" +
    "    <rui-button ng-click=\"incrementClickCnt()\"\n" +
    "                ng-disabled=\"!enableButtons\">\n" +
    "      Default\n" +
    "    </rui-button>\n" +
    "    <p>\n" +
    "      Button state: <input rui-toggle type=\"checkbox\" id=\"disableBtns\"  ng-model=\"enableButtons\" on-text=\"enabled\" off-text=\"disabled\">\n" +
    "    </p>\n" +
    "\n" +
    "    <p>\n" +
    "      You can also have a dropdown with your <code>rui-button</code>:\n" +
    "    </p>\n" +
    "    <rui-button type=\"button\" class=\"context-button\" ng-model=\"dropdownSelection\"\n" +
    "      bs-options=\"option as option for option in dropdownOptions\"\n" +
    "      bs-select>\n" +
    "      Dropdown <span class=\"caret\"></span>\n" +
    "    </rui-button>\n" +
    "    <p>Selected: {{dropdownSelection}}</p>\n" +
    "  </div>\n" +
    "\n" +
    "\t<div>\n" +
    "\t\t<h2 class=\"page-header\">Help Text: <code>rui-helptext</code></h2>\n" +
    "    <p>\n" +
    "      Tuck help text in a convenient yet out-of-the-way place with <code>rui-helptext</code>. Use it primarily in form fields, attached to the label, to help the user fill out the form.\n" +
    "    </p>\n" +
    "    <p>\n" +
    "      Add an <code>rui-helptext</code> attribute to the element you want supplemented with help text. Use either the <code>message</code> or <code>data</code> attribute to specify the help text. <code>message</code> takes a string of helptext. <code>data</code> take an expression (such as a scope variable) that evaluates to help text.\n" +
    "    </p>\n" +
    "\t\t<label rui-helptext message=\"This is the help text sample text for helping with the text of samples.\" style=\"font-size:30px;\">Chya</label>\n" +
    "    <br/>\n" +
    "\t\t<label rui-helptext data=\"helptextdata\" style=\"font-size:20px;\">Chya</label>\n" +
    "    <br>\n" +
    "    <label rui-helptext data=\"helptextdata\" style=\"font-size:40px;\">Chaa</label>\n" +
    "\t</div>\n" +
    "\n" +
    "  <div>\n" +
    "\t\t<h2 class=\"page-header\">Tooltip: <code>rui-tooltip</code></h2>\n" +
    "\n" +
    "    <p>\n" +
    "      Add an <code>rui-tooltip</code> attribute to the element you want supplemented with help text using a hover. Set the <code>rui-tooltip</code> attribute equal to the tooltip message. \n" +
    "    </p>\n" +
    "\n" +
    "    <label rui-tooltip=\"This is the tooltip sample text that is found at the tip of the tool.\" style=\"font-size:20px;\">Hover Over Me!</label>\n" +
    "\n" +
    "    This is some sample text, with a tooltip option in the <b><span rui-tooltip=\"Cool, this tooltip is inline.\">middle.</span></b>\n" +
    "\n" +
    "    <br/>\n" +
    "\t</div>\n" +
    "\n" +
    "  <div>\n" +
    "    <h2 class=\"page-header\">Cards: <code>rui-card</code></h2>\n" +
    "    <rui-card ref=\"dashboard.organization.index({orgId: org.id})\">\n" +
    "      Sample Organization 1\n" +
    "    </rui-card>\n" +
    "    <rui-card ref=\"dashboard.organization.index({orgId: org.id})\">\n" +
    "      Sample Organization 2\n" +
    "    </rui-card>\n" +
    "    <div style=\"visibility:hidden;display:block;height:0;clear:both;\"></div>\n" +
    "\n" +
    "    <h2 class=\"page-header\">Create Card: <code>rui-card-create</code></h2>\n" +
    "    <rui-card-create create-fn=\"samplecreate(name)\">\n" +
    "      Create Organization\n" +
    "    </rui-card-create>\n" +
    "      <div style=\"visibility:hidden;display:block;height:0;clear:both;\"></div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div>\n" +
    "    <h2 class=\"page-header\">Alerts: <code>rui-alert</code></h2>\n" +
    "    <p>\n" +
    "      Use <code>rui-alert</code> as an element to display alerts, such as error messages, success messages, or anything else you want to call to the user's attention.\n" +
    "    </p>\n" +
    "    <rui-button ng-click=\"toggleAlert()\">Toggle Alerts</rui-button>\n" +
    "    <rui-alert message=\"alert.message\"></rui-alert>\n" +
    "    <div ng-repeat=\"type in ['info', 'warning', 'danger', 'success']\">\n" +
    "      <rui-alert title=\"alert.title\"\n" +
    "                 message=\"alert.message\"\n" +
    "                 type=\"type\"\n" +
    "                 show-contact=\"true\">\n" +
    "      </rui-alert>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div>\n" +
    "    <h2 class=\"page-header\">Tags: <code>rui-chip</code></h2>\n" +
    "    <rui-button ng-click=\"addTag()\">Add Tag</rui-button>\n" +
    "    <div>\n" +
    "      <rui-chip ng-repeat=\"tag in tags\"\n" +
    "                name=\"tag.name\"\n" +
    "                color=\"tag.color\"\n" +
    "                on-remove=\"removeTag(tag, $index)\">\n" +
    "      </rui-chip>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div>\n" +
    "    <h2 class=\"page-header\">Toggles: <code>rui-toggle</code></h2>\n" +
    "    <form name=\"toggleTestForm\" ng-submit=\"logToggle()\" novalidate>\n" +
    "      <div>\n" +
    "        <label>Disable next toggle?</label>\n" +
    "        <input rui-toggle\n" +
    "               type=\"checkbox\"\n" +
    "               id=\"toggle1\"\n" +
    "               name=\"toggle1\"\n" +
    "               ng-model=\"toggle1\"\n" +
    "               ng-change=\"incrementToggleCount()\"\n" +
    "               />\n" +
    "        Toggle1: {{toggle1}}\n" +
    "\n" +
    "      </div>\n" +
    "      <div>\n" +
    "        <label>Test toggle 2: </label>\n" +
    "        <input rui-toggle\n" +
    "               type=\"checkbox\"\n" +
    "               id=\"toggle2\"\n" +
    "               name=\"toggle2\"\n" +
    "               ng-model=\"toggle2\"\n" +
    "               on-text=\"on\"\n" +
    "               off-text=\"off\"\n" +
    "               ng-disabled=\"toggle1\"\n" +
    "               ng-true-value=\"'on'\"\n" +
    "               ng-false-value=\"'off'\"\n" +
    "               ng-change=\"incrementToggleCount()\"\n" +
    "               />\n" +
    "        Toggle2: {{toggle2}}\n" +
    "      </div>\n" +
    "      Toggles: {{toggleCount}}\n" +
    "    </form>\n" +
    "\n" +
    "  </div>\n" +
    "  <div>\n" +
    "      <p>Use the spinner to indicate work in progress. You can toggle it with ng-show. There is an inline version and a fullscreen version. The fullscreen version takes <code>top</code> and <code>left</code> attributes to indicate an offset so you can leave navigation exposed.</p>\n" +
    "      <rui-button ng-click=\"glimpseFullScreenSpinner()\">show fullscreen spinner</rui-button>\n" +
    "      <rui-fullscreen-spinner text=\"spinnerText\" ng-show=\"showFullScreenSpinner\"></rui-fullscreen-spinner>\n" +
    "      <br>\n" +
    "\n" +
    "      <rui-button ng-click=\"showInlineSpinner = !showInlineSpinner\">toggle inline spinner</rui-button>\n" +
    "      <br>\n" +
    "      <rui-spinner ng-show=\"showInlineSpinner\" fullscreen></rui-spinner>\n" +
    "  </div>\n" +
    "\n" +
    "  <style media=\"screen\">\n" +
    "    /* Hack the sidebar into place. */\n" +
    "    rui-sidenav .rui-sidenav{\n" +
    "      position: static !important;\n" +
    "    }\n" +
    "  </style>\n" +
    "\n" +
    "  <div>\n" +
    "    <h2 class=\"page-header\">Sidenav: <code>rui-sidenav</code></h2>\n" +
    "    <p></p>\n" +
    "    <rui-sidenav data=\"sidenavData\">\n" +
    "    </rui-sidenav>\n" +
    "  </div>\n" +
    "\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('templates/alert.html',
    "<div ng-show=\"message\" ng-class=\"'rui-alert rui-alert-' + (type || 'danger')\">\n" +
    "  <h4 ng-show=\"title\">{{ title }}</h4>\n" +
    "  <p>{{ message }}</p>\n" +
    "  <p ng-if=\"showContact\">\n" +
    "    Need more help? Let us know at <a class=\"rui-alert-link\" href=\"mailto:support@RedoxEngine.com\">support@RedoxEngine.com</a>.\n" +
    "  </p>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/button.html',
    "<button\n" +
    "  class=\"btn rui-btn\"\n" +
    "\tng-class=\"primary ? 'rui-btn-primary' : (secondary ? 'rui-btn-secondary' : 'rui-btn-default')\"\n" +
    "  ng-transclude>\n" +
    "</button>"
  );


  $templateCache.put('templates/card-create.html',
    "<a class=\"rui-card\">\n" +
    "\n" +
    "  <div class=\"card-box\" id=\"inputCard\" ng-show=\"editing\">\n" +
    "    <div class=\"card-box-text\">\n" +
    "      <input type=\"text\" ng-model=\"createinput\" id=\"createinput\" name=\"createinput\" autofocus=\"true\" rui-enter=\"create()\"></input>\n" +
    "    </div>\n" +
    "    <div class=\"create-container\">\n" +
    "      <a ng-click=\"create()\">Create</a>\n" +
    "    </div>\n" +
    "    <div class=\"cancel-container\">\n" +
    "      <a ng-click=\"editing = !editing\"><span class=\"ion-close-circled\" style=\"font-size:12px;margin-right:2px;\"></span>cancel</a>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"card-box\" id=\"iconCard\" ng-hide=\"editing\" ng-click=\"editing = !editing\">\n" +
    "    <div class=\"card-box-text\">\n" +
    "      <div class=\"card-create-icon ion-plus\"></div>\n" +
    "      <ng-transclude>\n" +
    "      </div>\n" +
    "  </div>\n" +
    "\n" +
    "</a>\n"
  );


  $templateCache.put('templates/card.html',
    "<a class=\"rui-card\" ui-sref={{ref}}>\n" +
    "  <div class=\"card-box\">\n" +
    "    <div class=\"card-box-text\">\n" +
    "      <ng-transclude>\n" +
    "      </div>\n" +
    "  </div>\n" +
    "</a>\n"
  );


  $templateCache.put('templates/chip.html',
    "<div class=\"rui-chip\" ng-style=\"style\">\n" +
    "  <span>{{name}}</span>\n" +
    "  <button type=\"button\" class=\"rui-close\" aria-label=\"Remove Tag\" ng-click=\"onRemove()\">\n" +
    "    <span aria-hidden=\"true\" ng-style=\"closeStyle\">&times;</span>\n" +
    "  </button>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/fullscreen.html',
    "<div class=\"rui-fullscreen\" ng-style=\"position\">\n" +
    "  <div class=\"rui-fullscreen-content\" ng-transclude>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('templates/helptext.html',
    "<div class=\"rui-helptext-container\">\n" +
    "  <span rui-tooltip={{message}}>\n" +
    "    <span class=\"rui-helptext-icon ion-help-circled\"></span>\n" +
    "  </span>\n" +
    "  <!-- <a class=\"rui-helptext-icon ion-help-circled\"><div rui-tooltip-data='{{message}}'></div></a> -->\n" +
    "</div>\n"
  );


  $templateCache.put('templates/select.html',
    ""
  );


  $templateCache.put('templates/sidenav.html',
    "<div class='rui-sidenav'>\n" +
    "  <perfect-scrollbar class=\"sidenav\">\n" +
    "    <div class=\"breadcrumbs\">\n" +
    "      <a ng-if=\"sidenavData.breadcrumb.previousState\" ui-sref=\"{{sidenavData.breadcrumb.previousState}}\">{{sidenavData.breadcrumb.previousStateTitle | characters:11}}</a>\n" +
    "      <span ng-if=\"sidenavData.breadcrumb.previousState\" class=\"ion-android-arrow-forward\"></span>\n" +
    "      <a ui-sref=\"{{sidenavData.breadcrumb.state}}\">{{sidenavData.breadcrumb.title | characters:11}}</a>\n" +
    "    </div>\n" +
    "    <ul>\n" +
    "      <li ng-repeat=\"section in sidenavData.sections\" ng-hide=\"section.hide\" ng-class=\"$state.name === '{{section.statename}}' ? 'active' :''\">\n" +
    "        <a ng-if=\"section.state && !section.href\" ui-sref=\"{{section.state}}\">\n" +
    "          <span class=\"{{section.icon}}\">&nbsp;&nbsp;&nbsp;{{section.title}}</span>\n" +
    "        </a>\n" +
    "        <a ng-if=\"section.href && !section.state\" ng-hide=\"section.hide\">\n" +
    "          <span class=\"{{section.icon}}\">&nbsp;&nbsp;&nbsp;{{section.title}}</span>\n" +
    "        </a>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </perfect-scrollbar>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/spinner-fullscreen.html',
    "<div rui-fullscreen top=\"{{top}}\" left=\"{{left}}\">\n" +
    "  <rui-spinner></rui-spinner>\n" +
    "  <h3 ng-if=\"text\">{{text}}</h3>\n" +
    "</div>"
  );


  $templateCache.put('templates/spinner.html',
    "<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"60px\" height=\"60px\"\n" +
    "   viewBox=\"0 0 60 60\" enable-background=\"new 0 0 60 60\" xml:space=\"preserve\">\n" +
    "  <g>\n" +
    "    <polygon fill=\"#00B288\" points=\"33,3.6 27.6,0.1 26.9,0.1 26.9,3.5 30.2,5.5 26.9,7.4 26.9,10.8 27.6,10.8 33,7.3  \">\n" +
    "\n" +
    "    <animateTransform id=\"c0\" attributeName=\"transform\"\n" +
    "       attributeType=\"XML\"\n" +
    "       type=\"rotate\"\n" +
    "       values=\"0 30 30;0 30 30;360 30 30\"\n" +
    "       begin=\"0s\"\n" +
    "       dur=\"1500ms\"\n" +
    "       repeatCount=\"indefinite\" />\n" +
    "\n" +
    "    </polygon>\n" +
    "    <polygon fill=\"#00B288\" points=\"33,3.6 27.6,0.1 26.9,0.1 26.9,3.5 30.2,5.5 26.9,7.4 26.9,10.8 27.6,10.8 33,7.3  \">\n" +
    "\n" +
    "    <animateTransform id=\"c1\" attributeName=\"transform\"\n" +
    "       attributeType=\"XML\"\n" +
    "       type=\"rotate\"\n" +
    "       values=\"0 30 30;30 30 30;360 30 30\"\n" +
    "       begin=\"0s\"\n" +
    "       dur=\"1500ms\"\n" +
    "       repeatCount=\"indefinite\" />\n" +
    "\n" +
    "    </polygon>\n" +
    "    <polygon fill=\"#00B288\" points=\"33,3.6 27.6,0.1 26.9,0.1 26.9,3.5 30.2,5.5 26.9,7.4 26.9,10.8 27.6,10.8 33,7.3  \">\n" +
    "\n" +
    "    <animateTransform id=\"c2\" attributeName=\"transform\"\n" +
    "       attributeType=\"XML\"\n" +
    "       type=\"rotate\"\n" +
    "       values=\"0 30 30;60 30 30;360 30 30\"\n" +
    "       dur=\"1500ms\"\n" +
    "       begin=\"0s\"\n" +
    "       repeatCount=\"indefinite\" />\n" +
    "\n" +
    "    </polygon>\n" +
    "    <polygon fill=\"#00B288\" points=\"33,3.6 27.6,0.1 26.9,0.1 26.9,3.5 30.2,5.5 26.9,7.4 26.9,10.8 27.6,10.8 33,7.3  \">\n" +
    "\n" +
    "    <animateTransform id=\"c3\" attributeName=\"transform\"\n" +
    "       attributeType=\"XML\"\n" +
    "       type=\"rotate\"\n" +
    "       values=\"0 30 30;90 30 30;360 30 30\"\n" +
    "       dur=\"1500ms\"\n" +
    "       begin=\"0s\"\n" +
    "       repeatCount=\"indefinite\" />\n" +
    "\n" +
    "    </polygon>\n" +
    "    <polygon fill=\"#00B288\" points=\"33,3.6 27.6,0.1 26.9,0.1 26.9,3.5 30.2,5.5 26.9,7.4 26.9,10.8 27.6,10.8 33,7.3  \">\n" +
    "\n" +
    "    <animateTransform id=\"c4\" attributeName=\"transform\"\n" +
    "       attributeType=\"XML\"\n" +
    "       type=\"rotate\"\n" +
    "       values=\"0 30 30;120 30 30;360 30 30\"\n" +
    "       dur=\"1500ms\"\n" +
    "       begin=\"0s\"\n" +
    "       repeatCount=\"indefinite\" />\n" +
    "\n" +
    "    </polygon>\n" +
    "    <polygon fill=\"#00B288\" points=\"33,3.6 27.6,0.1 26.9,0.1 26.9,3.5 30.2,5.5 26.9,7.4 26.9,10.8 27.6,10.8 33,7.3  \">\n" +
    "\n" +
    "    <animateTransform id=\"c5\" attributeName=\"transform\"\n" +
    "       attributeType=\"XML\"\n" +
    "       type=\"rotate\"\n" +
    "       values=\"0 30 30;150 30 30;360 30 30\"\n" +
    "       dur=\"1500ms\"\n" +
    "       repeatCount=\"indefinite\" />\n" +
    "\n" +
    "    </polygon>\n" +
    "    <polygon fill=\"#00B288\" points=\"33,3.6 27.6,0.1 26.9,0.1 26.9,3.5 30.2,5.5 26.9,7.4 26.9,10.8 27.6,10.8 33,7.3  \">\n" +
    "\n" +
    "    <animateTransform id=\"c6\" attributeName=\"transform\"\n" +
    "       attributeType=\"XML\"\n" +
    "       type=\"rotate\"\n" +
    "       values=\"0 30 30;180 30 30;360 30 30\"\n" +
    "       dur=\"1500ms\"\n" +
    "       repeatCount=\"indefinite\" />\n" +
    "\n" +
    "    </polygon>\n" +
    "    <polygon fill=\"#00B288\" points=\"33,3.6 27.6,0.1 26.9,0.1 26.9,3.5 30.2,5.5 26.9,7.4 26.9,10.8 27.6,10.8 33,7.3  \">\n" +
    "\n" +
    "    <animateTransform id=\"c7\" attributeName=\"transform\"\n" +
    "       attributeType=\"XML\"\n" +
    "       type=\"rotate\"\n" +
    "       values=\"0 30 30;210 30 30;360 30 30\"\n" +
    "       dur=\"1500ms\"\n" +
    "       repeatCount=\"indefinite\" />\n" +
    "\n" +
    "    </polygon>\n" +
    "    <polygon fill=\"#00B288\" points=\"33,3.6 27.6,0.1 26.9,0.1 26.9,3.5 30.2,5.5 26.9,7.4 26.9,10.8 27.6,10.8 33,7.3  \">\n" +
    "\n" +
    "    <animateTransform id=\"c8\" attributeName=\"transform\"\n" +
    "       attributeType=\"XML\"\n" +
    "       type=\"rotate\"\n" +
    "       values=\"0 30 30;240 30 30;360 30 30\"\n" +
    "       dur=\"1500ms\"\n" +
    "       repeatCount=\"indefinite\" />\n" +
    "\n" +
    "    </polygon>\n" +
    "    <polygon fill=\"#00B288\" points=\"33,3.6 27.6,0.1 26.9,0.1 26.9,3.5 30.2,5.5 26.9,7.4 26.9,10.8 27.6,10.8 33,7.3  \">\n" +
    "\n" +
    "    <animateTransform id=\"c9\" attributeName=\"transform\"\n" +
    "       attributeType=\"XML\"\n" +
    "       type=\"rotate\"\n" +
    "       values=\"0 30 30;270 30 30;360 30 30\"\n" +
    "       dur=\"1500ms\"\n" +
    "       repeatCount=\"indefinite\" />\n" +
    "\n" +
    "    </polygon>\n" +
    "    <polygon fill=\"#00B288\" points=\"33,3.6 27.6,0.1 26.9,0.1 26.9,3.5 30.2,5.5 26.9,7.4 26.9,10.8 27.6,10.8 33,7.3  \">\n" +
    "\n" +
    "    <animateTransform id=\"c10\" attributeName=\"transform\"\n" +
    "       attributeType=\"XML\"\n" +
    "       type=\"rotate\"\n" +
    "       values=\"0 30 30;300 30 30;360 30 30\"\n" +
    "       dur=\"1500ms\"\n" +
    "       repeatCount=\"indefinite\" />\n" +
    "\n" +
    "    </polygon>\n" +
    "    <polygon fill=\"#00B288\" points=\"33,3.6 27.6,0.1 26.9,0.1 26.9,3.5 30.2,5.5 26.9,7.4 26.9,10.8 27.6,10.8 33,7.3  \">\n" +
    "\n" +
    "    <animateTransform id=\"c11\" attributeName=\"transform\"\n" +
    "       attributeType=\"XML\"\n" +
    "       type=\"rotate\"\n" +
    "       values=\"0 30 30;330 30 30;360 30 30\"\n" +
    "       dur=\"1500ms\"\n" +
    "       repeatCount=\"indefinite\" />\n" +
    "\n" +
    "    </polygon>\n" +
    "  </g>\n" +
    "</svg>\n"
  );

}]);
