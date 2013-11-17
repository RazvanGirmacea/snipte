// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function (tab) {
	alert('loaded');
});


chrome.runtime.sendMessage(
	{
		html: new XMLSerializer().serializeToString(document),
		status: 'ok'
	}
);