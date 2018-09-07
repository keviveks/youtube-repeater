
var vs = document.getElementsByClassName("video-stream")[0];

/**
 * Remove the extension data from storage
 */
chrome.storage.sync.remove(['youtube_repeater_extension'], function() {
    console.log('youtube repeater extension storage cleared!');
});

/**
 * Add repeat event to youtube video stream
 */
vs.addEventListener("ended", function(event) {
    // check extension repeater is on for this video
    chrome.storage.sync.get(['youtube_repeater_extension'], function(data) {
        ytData = JSON.parse(atob(data.youtube_repeater_extension));
        if (ytData.repeat && ytData.url === window.location.href) {
            vs.play();
        }
    });
});

/**
 * Set URL & extenstion data on repeat button click
 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === "repeat_youtube") {
        chrome.storage.sync.set({
            'youtube_repeater_extension': btoa(JSON.stringify(request.data))
        }, function() {
            console.log('saved data in storage!!');
        });
    }
});
