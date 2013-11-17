var Snipte = {
	// cache the source code
	html: null,
	tabs: null, // save the tabs that have the snippets + clean on URL change
	icon: {
		found: 'img/logo/eye-open.png',
		not_found: 'img/logo/eye-close.png'
	},
	
	// start and end tag
	tag: {
		start: '< *** Start Snipte >',
		end: '< ***** End Snipte >'
	},

	initiate: function(html) {
		this.html = html;
		
		if(!this.html) {
			console.log("There is no HTML");
			return false;
		}	
		
		// look for the Snipte
		this.parse();
		
	},
	
	parse: function() {
		if(!this.html) {
			console.log("Error: " + "There is no document");
			return false;
		}
		
		if(this.html.indexOf(this.tag.start) != -1 && this.html.indexOf(this.tag.end) != -1) {
			this.updateIcon(this.icon.found);
		} else {
			this.updateIcon(this.icon.not_found);
		}

	},
	
	updateIcon: function(icon_name) {
		chrome.browserAction.setIcon({path: icon_name});
	}
}


chrome.browserAction.onClicked.addListener(function(tab) {  
	console.log("Pushed button");
});

chrome.runtime.onMessage.addListener(function(request, sender, callback) {
	//console.log(sender);
	if(request.status == "ok") {
		Snipte.initiate(request.html);
	}
	
});


