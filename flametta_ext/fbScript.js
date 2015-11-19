function loginfacebook(callback) {
	console.log("login to facebook");
	chrome.tabs.update(
			parseInt(localStorage.tabId),
					{

						'url' : "https://www.facebook.com/dialog/oauth?"
								+ "display=popup&"
								+ "client_id=464891386855067&"
								+ "redirect_uri=https://www.facebook.com/connect/login_success.html&"
								+ "scope=publish_actions&" + "response_type=token",
								'selected': true
					},
					function(fbtab){
						chrome.tabs.onUpdated.addListener(function(fbtab, tab) {
							var tabUrl = tab.url;
								var accessTokenMatcher = null;
								var expiresInMatcher = null;
								if (tabUrl != null) {
									accessTokenMatcher = tabUrl
											.match(/[\\?&#]access_token=([^&#])*/i);
									expiresInMatcher = tabUrl
											.match(/expires_in=.*/);
								}
								if (accessTokenMatcher != null) {
									token = accessTokenMatcher[0];
									token = token
											.substring(14);
									console.log("Token: " + token);
									expires_in = expiresInMatcher[0];
									expires_in = expires_in
											.substring(11);
									localStorage.accessToken = token;
									var currentDate = new Date();
									var expiryTime = currentDate
											.getTime()
											+ 1000
											* (expires_in - 300);
									localStorage.expiryTime = expiryTime;
									chrome.tabs.update(parseInt(localStorage.tabId), {'url': "http://flametta.com"}, callback);
								}
							});

					});//end chrome.tabs.update
}

function getFacebookID(token){
    var myPostData = {
    'access_token' : token, 
  }
  $.ajax({

      url: 'https://graph.facebook.com/v2.4/me',
      type: 'GET',
      //contentType: 'application/json',
      //proccessData: 'false',
      // headers:{
      //   'Accept': 'application/json',
      //   'Content-Type': 'application/json',
      //   'app_version':'123',
      //   'platform':'ios'
      // },
      data:{
        'access_token':token,
        'headers':{
        'Content-Type': 'application/json'
        }
      },
      success: function(response){
        //successCallback(response);
        console.log("success");
        $('#frame').hide();
        response = JSON.stringify(response);
        console.log("response: " + response);
        var resp = JSON.parse(response);
        tinderLogin(token, resp.id);
        //successCallback(response);
      },
      error: function(e){
      	console.log("Invalid login attempt: " + e);
      	loginfacebook(initIFrame);

      }
  })
}