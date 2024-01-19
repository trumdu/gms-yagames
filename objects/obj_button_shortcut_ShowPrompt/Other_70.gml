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
			
            case YaGames_CallShortcutCreated:
				var _data = json_parse(async_load[? "data"]);
				log("Can Shortcut? " + (_data.canShow ? "true" : "false"));
				if (_data.canShow) {
					log("Is Accepted? " + (_data.outcome == "accepted" ? "true" : "false"));
				}
				else {
					log("Reason: " + _data.reason);
				}
                // Shortcut show promt
            break;
            case YaGames_CallShortcutCreateError:
                var errCode = async_load[? "code"];
                var errName = async_load[? "name"];
                var errMessage = async_load[? "message"];			
                // Shortcut show promt error
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

