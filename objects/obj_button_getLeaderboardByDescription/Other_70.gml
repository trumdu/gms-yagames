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
			
            case YaGames_CallLeaderboardsRequest:
                // Leaderboard initialization success
				var _data = json_parse(async_load[? "data"]);
				log("AppID: " + string(_data.appID));
				// _data.dеfault
				// _data.name
				// _data.title.en
				// _data.title.ru

            break;
            case YaGames_CallLeaderboardsRequestError:
                var errCode = async_load[? "code"];
                var errName = async_load[? "name"];
                var errMessage = async_load[? "message"];			
                // Leaderboard initialization error
				
            break;
			
            case YaGames_CallNotLeaderboardInitSDK:
                // Leaderboard in SDK not initialized
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

