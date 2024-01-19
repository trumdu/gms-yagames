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
			
			case YaGames_CallDeviceType:
				// Device Type
                var _value = async_load[? "value"];
				switch (_value) {
					case YaGames_DeviceDesktop:
						dev_type = "Desktop";
						break;
					case YaGames_DeviceTablet:
						dev_type = "Tablet";
						break;
					case YaGames_DeviceMobile:
						dev_type = "Mobile";
						break;
					case YaGames_DeviceTV:
						dev_type = "TV";
						break;
					case YaGames_DeviceUndefined:
						dev_type = "Undefined";
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
