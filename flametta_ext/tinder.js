function tinderLogin(token, id){
  console.log('Access Token = '+ token);

  var myPostData = {
    'facebook_token' : token, 
    'facebook_id' : id
  }
  var customHeaders = {
        'Content-Type': 'application/json',
        'app_version':'123',
        'platform':'ios'
  }
  //var dataString = JSON.stringify(postData);

  var endPointURL = {'url':'https://api.gotinder.com/auth'}

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
        'postData':myPostData,
        'endPointURL':'https://api.gotinder.com/auth',
        'headers':customHeaders
      },
      success: function(response){
        //parse the tinder token and send it via a content script to the web page
        console.log("Tab ID: "+ localStorage.tabId);
        var newURL = "http://flametta.com";
        //chrome.tabs.update(parseInt(localStorage.tabId), { url: newURL }, tinderLoginSuccess(response));
        tinderLoginSuccess(response);
      }
  })
}
function tinderLoginSuccess(response){
  //response = JSON.stringify(response);
  var resp = JSON.parse(response);
  console.log("response: " + resp);
  console.log("Response token: " + resp.token);
  chrome.tabs.sendMessage(parseInt(localStorage.tabId), {"action": "tinderlogin", "tinderToken": resp.token}, function(response) {
      //chrome.tabs.create({ url: "http://"+response.farewell+".com"});
      console.log("message response: "+ response.farewell);
  });

}
function successCallback(responseObj){
     //do something like read the response and show data 
     alert(JSON.stringify(responseObj)); // Only applicable to JSON response
}


// // //TINDER STUFF HERE
//   var app = angular.module('myApp', []);
//     app.controller('myCtrl', function($scope, $http) {
//       $scope.loginResponse = "default";
//       function auth(){
//         console.log('Access Token = '+ fb_access_token);
//         console.log('User ID = '+ fb_user_id);
//         console.log('Attempting tinder login');
//         $scope.loginResponse = "default";
//         fb_user_id = "758335012";
//         console.log(fb_user_id);

//         // var req = {
//         //   method: 'POST',
//         //   'url': 'https://api.gotinder.com/auth',
//         //   headers:{
//         //     'Content-Type': 'application/json',
//         //     'app_version':'123',
//         //     'platform':'ios'
//         //   }
//         //   data:{
//         //     'facebook_token' : fb_access_token, 
//         //     'facebook_id' : fb_user_id
//         //   }
//         // };

//         // var res = $http.post(req);
//         // res.success(function(data, status, headers, config) {
//         //   console.log(data);
//         //   console.log(status);
//         //   console.log(headers);
//         //   $scope.loginResponse = data;
//         // });
//         // res.error(function(data, status, headers, config) {
//         //    console.log(data);
//         //   console.log(status);
//         //   console.log(headers);
//         //   alert( "failure message: " + JSON.stringify({data: data}));
//         // });  
//       } 
//       //auth();
//     });
