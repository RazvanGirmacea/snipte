var status_tabs = []; // save tabs "found" status

var SnipteBackground = {

  api_url: "http://api.snipte.org/server/script.php",

  icon: {
    found: 'img/logo/eye-open.png',
    not_found: 'img/logo/eye-close.png'
  },


  initiate: function(tab, found) {
    if(found) {
      this.updateIcon(this.icon.found);
      if(status_tabs.indexOf(tab.id) == -1) {
        status_tabs.push(tab.id);
      }

      // send request
      var xhr = new XMLHttpRequest();
      xhr.open("POST", this.api_url, true);
      xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
      xhr.send("url=" + encodeURIComponent(tab.url));

    } else {
      this.updateIcon(this.icon.not_found);
      if(status_tabs.indexOf(tab.id) != -1) {
        status_tabs.splice(status_tabs.indexOf(tab.id),1);
      }
    }
  },


  updateIcon: function(icon_name) {
    chrome.browserAction.setIcon({path: icon_name});
  }
};


chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({'url': "http://snipte.org"});
});

chrome.runtime.onMessage.addListener(function(request, sender, callback) {
	if(request.action == "find") {
		SnipteBackground.initiate(sender.tab, request.response);
//    console.log(status_tabs);
	}
});

chrome.tabs.onActivated.addListener(function(current){
//  console.log(current.tabId);
  if(status_tabs.indexOf(current.tabId) == -1) {
    SnipteBackground.updateIcon(SnipteBackground.icon.not_found);
  } else {
    SnipteBackground.updateIcon(SnipteBackground.icon.found);
  }
});
