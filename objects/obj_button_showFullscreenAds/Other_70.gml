/// @description Parse YaGames events
if (not isMap(async_load)) {
    log("async_load got lost in cyberspace");
} else {
    if ((async_load[? "type"] == "YaGames") and (async_load[? "request_id"] == req_id)) {
		// Logging
        var _msg = json_encode(async_load);
        log(_msg);
		//
        switch (async_load[? "event"]) {	
			
            case "adClosed":
                // The ad is closed
                var _data = async_load[? "data"];
				// Has the ad been shown?
				var _isShown = _data[? "wasShown"];
            break;
            case "adOpened":
                // Advertising is open
            break;
            case "offlineMode":
                // The device has lost its connection to the Internet
            break;
            case "adError":
                var errCode = async_load[? "code"];
                var errName = async_load[? "name"];
                var errMessage = async_load[? "message"];	
                // Error displaying ads
            break;
			
            case "notInitSDK":
                // SDK not initialized
            break;
            case "RuntimeError":
                var errCode = async_load[? "code"];
                var errName = async_load[? "name"];
                var errMessage = async_load[? "message"];	
                // SDK runtime error
            break;
        }
   }
}

