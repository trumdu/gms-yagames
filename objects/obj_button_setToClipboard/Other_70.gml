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
			
            case YaGames_CallClipboardSuccess:
                // Success of copy to clipboard
            break;
            case YaGames_CallClipboardError:
                var _code = async_load[? "code"];
                var _name = async_load[? "name"];
                var _message = async_load[? "message"];			
                // Copy to clipboard error
            break;
			
            case YaGames_CallNotInitSDK:
                // SDK not initialized
            break;
            case YaGames_CallRuntimeError:
                var _code = async_load[? "code"];
                var _name = async_load[? "name"];
                var _message = async_load[? "message"];	
                // SDK runtime error
            break;
        }
   }
}

