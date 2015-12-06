var flamettaCtrl = angular.module('flamettaCtrl', []);
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
	     /*
	      $http({
		      url: 'http://flametta.com/proxy.php',
		      method: 'POST',
		      data:{
		        'method':'get',
		        'postData': myPostData,
		        'endPointURL':'https://api.gotinder.com/profile',
		        'token':localStorage.tinderToken
		    	}
		      }).then(function successCallBack(response){
		      	$scope.firstname = "bill";
		      	console.log("Success");
		      	response = JSON.stringify(response);
		      	console.log(response);
		      	// console.log(response.name);
		      	// $scope.firstname = response.name;
		      	//console.log(response);
		      	//var response = JSON.stringify(response);
		  		//alert(response);
		      }, function errorCallback(response) {
		      		console.log("error");
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
			  });
			*/
}]);

flamettaCtrl.controller('welcomeCtrl', function($scope){
		console.log("Welcome Controller");
		$scope.firstname = "bob";
});