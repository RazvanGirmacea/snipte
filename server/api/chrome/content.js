var SnipteContent = {
  // cache the source code
  html: null,
  found: null,

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
    this.found = this.parse();

  },

  parse: function() {
    if(!this.html) {
      console.log("Error: " + "There is no document");
      return false;
    }

    if(this.html.indexOf(this.tag.start) != -1 && this.html.indexOf(this.tag.end) != -1) {
      return true;
    } else {
      return false;
    }

  }
};


if (window == top) {
  SnipteContent.initiate(new XMLSerializer().serializeToString(document));
  chrome.runtime.sendMessage(
    {"action": "find","response": SnipteContent.found}
  );
}
