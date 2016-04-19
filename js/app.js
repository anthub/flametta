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

flamettaApp.factory('Poller', function($http, $timeout){
  var data = {response: {}, calls: 0};
  var poller = function() {
      console.log("poller");

      var myPostData = {"last_activity_date":""};

      if(data.calls > 0){
        myPostData = {"last_activity_date":getLastActivityTime()};
      }

      function getLastActivityTime(){
        var d = new Date();
        d.setSeconds(d.getSeconds() - 30);
        return d;
      }

      $.ajax({
        url: 'http://flametta.com/proxy.php',
        type: 'post',
        data:{
          'method':'post',
          'postData': myPostData,
          'endPointURL':'https://api.gotinder.com/updates',
          'token':localStorage.tinderToken
        },
        success: function(response){
          console.log("Success");
          response = JSON.parse(response);
          //only update the data object if we have more than 1 match
          if(response.matches.length > 0){
            data.response = response;
            if(data.calls == 0){
              localStorage.matchData = response;

              
            }
            else{data.calls = -1;}

            
            console.log(data.response);
          }
          data.calls++;
          console.log(data.calls)
          $timeout(poller, 30000);

      } 
    })
  };
  poller();

  return {
    data: data
  };
});
flamettaApp.run(function(Poller) {});