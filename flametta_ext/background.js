chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.create({'url': "http://flametta.com", 'selected': true}, callBack);
});
function callBack(tab){
	localStorage.tabId = tab.id;
	initIFrame()
	setInterval(function() { initIFrame(); }, 300000);
}