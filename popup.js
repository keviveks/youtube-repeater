document.addEventListener('DOMContentLoaded', function() {
    var url = "https://www.youtube.com";
    var watchUrl = url + "/watch?v=";
    var reloadYouTube = document.getElementById('reloadYouTube');
    var youTubePage = document.getElementById('youTubePage');
    var otherPages = document.getElementById('otherPages');
    var youTubeURL = document.getElementById('youTubeURL');
    /**
     * Check/Validate current tab url
     */
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var activeTab = tabs[0];
        if (activeTab.url.indexOf(url) > -1) {
            youTubePage.style.display = "block";
            otherPages.style.display = "none";
            if (activeTab.url.indexOf(watchUrl) > -1) {
                youTubeURL.innerHTML = activeTab.url;
                reloadYouTube.removeAttribute("disabled");
            }
        } else {
            youTubePage.style.display = "none";
            otherPages.style.display = "block";
        }
        /**
         * Repeat button click event handler
         */
        reloadYouTube.addEventListener('click', function() {
            // sent message with youTube data
            chrome.tabs.sendMessage(activeTab.id, {
                message: "repeat_youtube",
                data: {
                    url: youTubeURL.innerHTML,
                    repeat: true
                }
            });
        });
    });

    
});
