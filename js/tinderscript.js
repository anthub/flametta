
console.log("Hello from tinderscript");
// Listen you CRX event
document.addEventListener('csEvent', function (event) {
	var data = event.detail;
	localStorage.tinderToken = data.tinderToken;
	console.log("data: " + data.tinderToken);

	// Do something with you data from CRX
	//Get profile data
    var myPostData = null;
    console.log("Change to profile");
    //ocation.assign("http://flametta.com/#/profile")
    
	  //var dataString = JSON.stringify(postData);

	  //var endPointURL = {'url':'https://api.gotinder.com/profile'}
	  /*
	  $.ajax({

	      url: 'http://flametta.com/proxy.php',
	      type: 'post',
	      //contentType: 'application/json',
	      //proccessData: 'false',
	      // headers:{
	      //   'Accept': 'application/json',
	      //   'Content-Type': 'application/json',
	      //   'app_version':'123',
	      //   'platform':'ios'
	      // },
	      data:{
	        'method':'get',
	        'postData': myPostData,
	        'endPointURL':'https://api.gotinder.com/profile',
	        'token':data.tinderToken
	      },
	      success: function(response){
	      	console.log("Success");
	      	location.assign("http://flametta.com/#/profile")
	      	var resp = response
	      	//resp = JSON.parse(resp);

	      	//var response = JSON.stringify(response);
	  		//alert(response);
	      }
	  })
	*/
	});
