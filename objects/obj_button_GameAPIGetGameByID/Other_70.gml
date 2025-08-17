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
			
            case YaGames_CallGetGameById:
				var _data = json_parse(async_load[? "data"]);
				// _data.appID
				var _title = _data.title;
				// _data.url
				// _data.coverURL
				// _data.iconURL
				log("Game Title: " + _title);
            break;
            case YaGames_CallGetGameByIdUndefined:
                // The game is not available for the current site or localization
            break;
            case YaGames_CallGetGameByIdError:
                var errCode = async_load[? "code"];
                var errName = async_load[? "name"];
                var errMessage = async_load[? "message"];			
                // Error when requesting a game on the account by the game ID
				// If the error message is 400 -> the game has not been published or is on another account.
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

