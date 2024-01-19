/// @description Parse YaGames events
if (not isMap(async_load)) {
    log("async_load got lost in cyberspace");
} else {
    if ((async_load[? "type"]== YaGames_AsyncEvent) and (async_load[? "request_id"] == req_id)) {
		// Logging
        var _msg = json_encode(async_load);
        log(_msg);
		//
        switch (async_load[? "event"]) {	
			
            case YaGames_CallAdClosed:
                // The ad is closed
				var _data = json_parse(async_load[? "data"]);
				log("Was shown: " + string(_data.wasShown));
            break;
            case YaGames_CallAdOpened:
                // Advertising is open
            break;
            case YaGames_CallOfflineMode:
                // The device has lost its connection to the Internet
            break;
            case YaGames_CallAdError:
                var errCode = async_load[? "code"];
                var errName = async_load[? "name"];
                var errMessage = async_load[? "message"];	
                // Error displaying ads
            break;
			
            case YaGames_CallNotInitSDK:
                // SDK not initialized
            break;
            case YaGames_CallRuntimeError:
                var errCode = async_load[? "code"];
                var errName = async_load[? "name"];
                var errMessage = async_load[? "message"];	
                // SDK runtime error
            break;
        }
   }
}

