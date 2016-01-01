var flamettaCtrl = angular.module('flamettaCtrl', []);

flamettaCtrl.controller('matchesCtrl', ['$scope', function($scope){
	console.log("Matches Controller");
	//2014-12-01T00:00:00.002Z
	//$scope.date = new Date(); 


	var myPostData = {"last_activity_date":""};
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
	  	
	  	console.log(response);
	  	
	  	$scope.$apply(function() {
		  $scope.matches = response;
		  $scope.orderByVar = "last_activity_date";
		  $scope.mySwitch = false;
	 	  $scope.reverse = true;
		  $scope.myReverseSwitch = true;
		  
		  	
		});
		console.log($scope.matches.matches.length);
		getMatchData(0, $scope.matches.matches[0].person._id);

		/*
		 for(i=0; i<$scope.matches.matches.length; i++){
		  	console.log("match: " + i);
		  	getMatchData($scope.matches.matches[i].person._id);

		  }
		  */
	  	//console.log(response);
	  	//var response = JSON.stringify(response);
			//alert(response);
	  }
	})
	function getMatchData(index, userID){
		console.log("ID: " + userID);
		myPostData = null;
		url =  'https://api.gotinder.com/user/'+userID;
		$.ajax({
			url: 'http://flametta.com/proxy.php',
			type: 'post',
			data:{
				'method':'get',
				'postData': myPostData,
				'endPointURL': url,
				'token':localStorage.tinderToken
			},
			success: function(response){
				console.log("Success");
				response = JSON.parse(response);
				console.log(response);
				$scope.matches.matches[index].ping_time = response.results.ping_time;
				console.log($scope.matches.matches[0].ping_time);
			}
		});

	}

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