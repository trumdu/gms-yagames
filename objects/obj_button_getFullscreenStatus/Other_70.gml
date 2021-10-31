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
			
			case "fullscreenStatus":
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
