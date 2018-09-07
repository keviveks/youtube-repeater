document.addEventListener('DOMContentLoaded', function() {
    var url = "https://www.youtube.com";
    var watchUrl = url + "/watch?v=";
    var repeatYoutube = document.getElementById('repeatYoutube');
    var stopYoutube = document.getElementById('stopYoutube');
    var youtubePage = document.getElementById('youtubePage');
    var otherPages = document.getElementById('otherPages');
    var youtubeText = document.getElementById('youtubeText');
    var youtubeURL = document.getElementById('youtubeURL');
    var visitYouTube = document.getElementById('visitYouTube');
    /**
     * Check/Validate current tab url
     */
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var activeTab = tabs[0];
        if (activeTab.url.indexOf(url) > -1) {
            youtubePage.style.display = "block";
            otherPages.style.display = "none";
            if (activeTab.url.indexOf(watchUrl) > -1) {
                youtubeText.innerHTML = "Click the Repeat button to enjoy the video unlimit..";
                youtubeURL.innerHTML = activeTab.url;
                repeatYoutube.removeAttribute("disabled");
                stopYoutube.style.display = "none";
            } else {
                youtubeText.innerHTML = "You are not watching any video to repeat!";
                repeatYoutube.setAttribute("disabled", "disabled");
                stopYoutube.style.display = "none";
            }
        } else {
            youtubePage.style.display = "none";
            otherPages.style.display = "block";
        }

        /**
         * onLoad event handler
         */
        chrome.tabs.sendMessage(activeTab.id, {
            message: "popup_load",
            data: {}
        }, function (response) {
            if (response && response.repeat && response.url === activeTab.url) {
                youtubeText.innerHTML = "Repeater is running the video at _ time";
                youtubeURL.innerHTML = activeTab.url;
                repeatYoutube.style.display = "none";
                stopYoutube.style.display = "block";
            }
        });

        /**
         * Repeat button click event handler
         */
        repeatYoutube.addEventListener('click', function() {
            // sent message with youTube data
            chrome.tabs.sendMessage(activeTab.id, {
                message: "repeat_youtube",
                data: {
                    url: youtubeURL.innerHTML,
                    repeat: true
                }
            }, function (response) {
                if (response.repeat) {
                    youtubeText.innerHTML = "This video will play unlimit.. enjoy!!";
                    youtubeURL.innerHTML = activeTab.url;
                    repeatYoutube.setAttribute("disabled", "disabled");
                    repeatYoutube.style.display = "none";
                    stopYoutube.style.display = "block";
                }
            });
        });

        /**
         * Stop repeat button event handler
         */
        stopYoutube.addEventListener("click", function() {
            // sent message to stop repeat
            chrome.tabs.sendMessage(activeTab.id, {
                message: "stop_repeat",
                data: {}
            }, function (response) {
                if (response.stopped) {
                    youtubeText.innerHTML = "Click the Repeat button to enjoy the video unlimit..";
                    youtubeURL.innerHTML = activeTab.url;
                    repeatYoutube.removeAttribute("disabled");
                    repeatYoutube.style.display = "block";
                    stopYoutube.style.display = "none";
                }
            });
        });
    });

    /**
     * Visit youtube button click
     */
    visitYouTube.addEventListener("click", function(e) {
        window.open(url, "_blank");
    });
});
