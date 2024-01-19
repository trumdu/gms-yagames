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
			
			case YaGames_CallFullscreenStatus:
				// Fullscreen Status
                var _value = async_load[? "value"];
				switch (_value) {
					case YaGames_FullScreen_ON:
						full_status = "STATUS_ON";
						break;
					case YaGames_FullScreen_OFF:
						full_status = "STATUS_OFF";
						break;
					default:
						dev_type = "ERROR " + string(_value);
				}
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
