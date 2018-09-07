/**
 * 
 * @author: keviveks <keviveks@gmail.com>
 */


/**
 * Remove the extension data from storage
 */
chrome.storage.sync.remove(['youtube_repeater_extension'], function() {
    console.log('youtube repeater extension storage cleared!');
});

/**
 * Set URL & extenstion data on repeat button click
 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === "repeat_youtube") {
        chrome.storage.sync.set({
            'youtube_repeater_extension': btoa(JSON.stringify(request.data))
        }, function() {
            // get the video stream from the dom
            var videoStream = document.getElementsByTagName("video")[0];
            /**
             * Add repeat event to youtube video stream
             */
            videoStream.addEventListener("ended", function(event) {
                // check extension repeater is on for this video
                chrome.storage.sync.get(['youtube_repeater_extension'], function(data) {
                    ytData = JSON.parse(atob(data.youtube_repeater_extension));
                    if (ytData.repeat && ytData.url === window.location.href) {
                        videoStream.play();
                    }
                });
            });
            sendResponse({ repeat: true });
        });
        return true;
    } else if (request.message === "popup_load") {
        // check extension repeater is on for this video
        chrome.storage.sync.get(['youtube_repeater_extension'], function(data) {
            ytData = JSON.parse(atob(data.youtube_repeater_extension));
            sendResponse(ytData);
        });
        return true;
    } else if (request.message === "stop_repeat") {
        // check extension repeater is on for this video
        chrome.storage.sync.remove(['youtube_repeater_extension'], function(data) {
            sendResponse({ stopped: true });
        });
        return true;
    }
});
