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
				var _dev_type = "";
				switch (_value) {
					case YaGames_DeviceDesktop:
						_dev_type = "Desktop";
						break;
					case YaGames_DeviceTablet:
						_dev_type = "Tablet";
						break;
					case YaGames_DeviceMobile:
						_dev_type = "Mobile";
						break;
					case YaGames_DeviceTV:
						_dev_type = "TV";
						break;
					case YaGames_DeviceUndefined:
						_dev_type = "Undefined";
						break;
					default:
						_dev_type = "ERROR " + string(_value);
				}
				show_message_async(_dev_type);
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
