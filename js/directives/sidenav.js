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
