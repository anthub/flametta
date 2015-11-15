console.log("messenger.js writing to your console log");

chrome.runtime.onMessage.addListener(
  function(data, sender, sendResponse) {
  	console.log("caught message");
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension: " + data.tinderToken);
      sendResponse({farewell: "goodbye"});

	 // send data through a DOM event
	document.dispatchEvent(new CustomEvent('csEvent', {detail: data}));
  });
