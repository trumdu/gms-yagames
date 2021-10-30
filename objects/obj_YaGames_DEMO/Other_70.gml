/*
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
                var errorDesc = async_load[? "value"];
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
                var errorDesc = async_load[? "value"];
                // Error displaying video ads
            break;
			
			// Clipboard
            case "clipboardSuccess":
                // The text was successfully copied to the clipboard
            break;
            case "clipboardError":
                var errorDesc = async_load[? "value"];
                // Copy error
            break;
			
			// Leaderboards
			case "leaderboardsInitError":
				// Leaderboards init error
                var errorDesc = async_load[? "value"];
			break;
			case "leaderboardsRequest":
				// Leaderboard data
                var data = async_load[? "data"];
			break;
			case "leaderboardsRequestError":
				// Leaderboard data
                var errorDesc = async_load[? "value"];
			break;
			case "leaderboardsPlayerEntry":
				// Leaderboard PlayerEntry data
                var data = async_load[? "data"];
			break;
			case "leaderboardsPlayerEntryError":
				// Leaderboard PlayerEntry data
                var errorDesc = async_load[? "value"];
			break;
			case "leaderboardsPlayerNotPresent":
				// Leaderboard PlayerEntry error
                var errorDesc = async_load[? "value"];
			break;
			case "leaderboardsEntries":
				// Leaderboard Entries data
                var data = async_load[? "data"];
			break;
			case "leaderboardsEntriesError":
				// Leaderboard Entries error
                var errorDesc = async_load[? "value"];
			break;
			case "leaderboardsSetScore":
				// Leaderboard SetScore data
                var data = async_load[? "data"];
			break;
			case "leaderboardsSetScoreError":
				// Leaderboard SetScore error
                var errorDesc = async_load[? "value"];
			break;
			
			// Other
			case "deviceType":
				// Device Type
				var msg = "";
                var value = async_load[? "value"];
				switch (value) {
					case YaGames_DeviceDesktop:
						msg += "Device Desktop";
						break;
					case YaGames_DeviceTablet:
						msg += "Device Tablet";
						break;
					case YaGames_DeviceMobile:
						msg += "Device Mobile";
						break;
					case YaGames_DeviceUndefined:
						msg += "Device Undefined";
						break;
					default:
						msg += "Device check error: " + string(value);
				}
			    log(msg);
			break;
            case "environment":
				// Environment information
                var environment = async_load[? "data"];
            break;
            case "notInitSDK":
                // SDK not initialized
            break;
            case "RuntimeError":
                var errorDesc = async_load[? "value"];
                // SDK runtime error
            break;
        }
   }
}*/

