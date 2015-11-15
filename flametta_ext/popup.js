function initIFrame() {
	chrome.tabs.query({
		active : true,
		currentWindow : true
	}, function(tabs) {
		var expiry = new Date(parseInt(localStorage.expiryTime));
		var now = new Date();
		// if a token from local storage hasn't expired
		if (localStorage.accessToken && now < expiry) {
			console.log("saved access Token: " + localStorage.accessToken);
			/*
			$('#frame').show();
			$('#frame').attr(
					'src',
					//the page on the server to use for iframe
					"http://flametta.com/tbot.html?url="
							+ encodeURIComponent(tabs[0].url) + "&accessToken="
							+ encodeURIComponent(localStorage.accessToken));
			*/
			//get the already logged in users facebook id so we can access the tinder app


			getFacebookID(localStorage.accessToken);
			//the tinder login is called in the getFacebookID callback since we need that first
			//tinderLogin(localStorage.accessToken);

		} else {
			//$('#frame').hide();
			loginfacebook(initIFrame);
		}

	});
}
//This is where it all starts... when the document is loaded we call the initIFrame function above
/*
document.addEventListener('DOMContentLoaded', function() {
	initIFrame();
});
*/