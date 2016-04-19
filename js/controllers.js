var flamettaCtrl = angular.module('flamettaCtrl', []);

flamettaCtrl.controller('matchesCtrl', ['$scope', 'Poller', function($scope, Poller){
	console.log("Matches Controller");
	//2014-12-01T00:00:00.002Z
	//$scope.date = new Date(); 


	$scope.matches = Poller.data.response;
	//$scope.matches = $scope.data.response;
	$scope.orderByVar = "last_activity_date";
  	$scope.mySwitch = false;
	$scope.reverse = true;
  	$scope.myReverseSwitch = true;
  	console.log($scope.matches.matches.length);

	$scope.toggle = function(){
		if($scope.mySwitch){
			$scope.orderByVar = "person.ping_time";
		}
		else{
			$scope.orderByVar = "last_activity_date";
		}
	}
	$scope.toggleReverse = function(){
		if($scope.myReverseSwitch){
			$scope.reverse = true;
		}else{
			$scope.reverse = false;
		}

	}

}]);

flamettaCtrl.controller('messageCtrl', ['$scope', '$routeParams', 'Poller', function($scope, $routeParams, Poller){
	$scope.matchId = $routeParams.matchId;
	console.log("Getting Message Data for userID: " + $scope.matchId);
	$scope.message = "";
	$scope.matches = Poller.data.response.matches;
	var match = null;
	console.log($scope.matches.length);
	for(var i=0, len = $scope.matches.length; i < len; i++){
		if($scope.matches[i]._id == $scope.matchId){
			$scope.match = $scope.matches[i];
			console.log("found user id: " + $scope.matchId + " to index: " + i);
			console.log($scope.match);
			break;
		}
	}
	$scope.sendMessage = function(){
		console.log("sending message: " + $scope.message);

		var myPostData = {"message":$scope.message};
		url =  'https://api.gotinder.com/user/matches/'+$scope.matchId;
		$.ajax({
			url: 'http://flametta.com/proxy.php',
			type: 'post',
			data:{
				'method':'post',
				'postData': myPostData,
				'endPointURL': url,
				'token':localStorage.tinderToken
			},
			success: function(response){
				console.log("Success");
				response = JSON.parse(response);
				console.log(response);
			}
		});
	}

	//getMatchData($scope.matchId);


	function getMatchData(userID){
		console.log("ID: " + userID);
		var myPostData = {"last_activity_date":""};
		url =  'https://api.gotinder.com/updates';
		$.ajax({
			url: 'http://flametta.com/proxy.php',
			type: 'post',
			data:{
				'method':'post',
				'postData': myPostData,
				'endPointURL': url,
				'token':localStorage.tinderToken
			},
			success: function(response){
				console.log("Success");
				response = JSON.parse(response);
				console.log(response);

				var match = null;
		  		for(var i=0, len = response.matches.length; i < len; i++){
		  			if(response.matches[i]._id == userID){
		  				match = response.matches[i];
		  				console.log("found user id: " + userID + " to index: " + i);
		  				console.log(match);
		  				break;
		  			}
		  		}
		  		$scope.$apply(function() {
		  			$scope.matches = response;
		  			$scope.match = match;	  		
		  		});
				//$scope.matches.matches[index].ping_time = response.results.ping_time;
				//console.log($scope.matches.matches[index].ping_time);
			}
		});

	}


}]);


flamettaCtrl.controller('profileCtrl', ['$scope', function($scope){
		console.log("Getting Profile Data");
		$scope.firstname = "bob";
		var myPostData = null;
	      $.ajax({
		      url: 'http://flametta.com/proxy.php',
		      type: 'post',
		      data:{
		        'method':'get',
		        'postData': myPostData,
		        'endPointURL':'https://api.gotinder.com/profile',
		        'token':localStorage.tinderToken
		      },
		      success: function(response){
		      	$scope.firstname = "bill";
		      	console.log("Success");
		      	response = JSON.parse(response);
		      	console.log(response.name);
		      	

		      	$scope.$apply(function() {
				  $scope.firstname = response.name;
				});
		      	//console.log(response);
		      	//var response = JSON.stringify(response);
		  		//alert(response);
		      }
	  	})
}]);

flamettaCtrl.controller('welcomeCtrl', function($scope){
		console.log("Welcome Controller");
		$scope.firstname = "bob";
});