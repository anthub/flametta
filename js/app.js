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
      when('/matches', {
        templateUrl: 'route/matches.html',
        controller: 'matchesCtrl'
      }).
      when('/profile', {
        templateUrl: 'route/profile.html',
        controller: 'profileCtrl'
      }).
      when('/messages/:matchId', {
        templateUrl: 'route/messages.html',
        controller: 'messageCtrl'
      }).
      otherwise({
        redirectTo: '/welcome'
      });
  }]);