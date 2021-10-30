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
                var errCode = async_load[? "code"];
                var errName = async_load[? "name"];
                var errMessage = async_load[? "message"];			
                // Error displaying video ads
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

