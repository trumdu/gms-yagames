/// @description Parse YaGames events
if (not isMap(async_load)) {
    log("async_load got lost in cyberspace");
} else {
    if (async_load[? "type"] == "YaGames") {
		
        msg = "YaGames async event received!" + chr(10);
        msg += json_encode(async_load);
        log(msg);
		
        switch (async_load[? "event"]) {
			// FullScreen Ads
            case "adShownAndClosed":
                // Ads displayed successfully
            break;
            case "adClosed":
                // The ad is closed but has not been shown
            break;
            case "adOpened":
                // Advertising is open
            break;
            case "offlineMode":
                // The device has lost its connection to the Internet
            break;
            case "adError":
                var errorDesc = async_load[? "error"];
                // Error displaying ads
            break;
			// Video Ads
            case "rewardOpened":
                // Video advertising is open
            break;
            case "rewardReceived":
                // The video ads has been successfully completed. The reward has been received.
            break;
            case "rewardClosed":
                // The video ads is closed
            break;
            case "rewardError":
                var errorDesc = async_load[? "error"];
                // Error displaying video ads
            break;
			// Clipboard
            case "ClipboardSuccess":
                // The text was successfully copied to the clipboard
            break;
            case "ClipboardError":
                var errorDesc = async_load[? "error"];
                // Copy error
            break;
			// All request
            case "notInitSDK":
                // SDK not initialized
            break;
            case "RuntimeError":
                var errorDesc = async_load[? "error"];
                // SDK runtime error
            break;
        }
   }
}

