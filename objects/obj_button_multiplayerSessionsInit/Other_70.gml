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
			
            case YaGames_CallMultiplayerSessionsInited:
				//var _data = json_parse(async_load[? "data"]);
				// _data[0].id
				// _data[0].meta.meta1
				// _data[0].meta.meta2
				// _data[0].meta.meta3
				// _data[0].player.avatar
				// _data[0].player.name
				// _data[0].timeline[0].id
				// _data[0].timeline[0].payload 
				// _data[0].timeline[0].time
				
            break;
            case YaGames_CallMultiplayerSessionsInitError:
                var errCode = async_load[? "code"];
                var errName = async_load[? "name"];
                var errMessage = async_load[? "message"];			
                // Init error
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

