angular.module('ruiComponents', ['truncate', 'mgcrea.ngStrap']);

angular.module('ruiComponents')
  .controller('ruiAppController', ['$scope', '$modal', function($scope, $modal){

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
    $scope.sampleCreate = function(name){
      alert('create ' + name)
    };

    $scope.sampleClick = function() {
      $modal({
        title: 'Click!',
        content: 'Thank you for clicking'
      });
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
