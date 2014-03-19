var Snipte = {
	// cache the source code
	html: null,
	
	// start and end tag
	tag: {
		start: '< *** Start Snipte >',
		end: '< ***** End Snipte >'
	},

	initiate: function() {
		this.html = document.getElementsByTagName("html")[0].innerHTML;
		
		if(!this.html) {
			console.log("There is no HTML");
			return false;
		}	
		
		console.log(this.html);
		
		// look for the Snipte
		this.parse();
		
	},
	
	parse: function() {
		if(!this.html) {
			console.log("Error: " + "There is no document");
			return false;
		}
		
		

	},
	
	updateIcon: function(icon_name) {
		chrome.browserAction.setIcon({path: icon_name});
	}
}

// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
	console.log("Listening");
  //Snipte.test();
});


chrome.browserAction.onClicked.addListener(function(tab) {  
	//Snipte.updateIcon("img/logo/eye-open.png");
	//Snipte.initiate();
	console.log("Pushed button");
	chrome.tabs.sendMessage(tab.id, {action: "getDOM"}, function(response) {
		console.log("Response: " + response);
    });
});

chrome.extension.onMessage.addListener(function(request, sender, callback) {
  var tabId = request.tabId;
chrome.tabs.sendMessage(tabId, {}, function(results) {
  console.log('nice');
});
});


