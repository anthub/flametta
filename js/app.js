var flamettaApp = angular.module('flamettaApp', [
	'ngRoute',
	'flamettaCtrl'

	]);
flamettaApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/welcome', {
        templateUrl: 'route/welcome.html',
        controller: 'welcomeCtrl'
      }).
      when('/profile', {
        templateUrl: 'route/profile.html',
        controller: 'profileCtrl'
      }).
      otherwise({
        redirectTo: '/welcome'
      });
  }]);