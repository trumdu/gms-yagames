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
			
			case YaGames_CallGetAllGames:
				var _data = json_parse(async_load[? "data"]);
				var _developer_url = _data.developerURL;
				// _data.games[0].appID
				// _data.games[0].title
				// _data.games[0].url
				// _data.games[0].coverURL
				// _data.games[0].iconURL
				log("Developer URL: " + _developer_url);
			break
			
			case YaGames_CallGetAllGamesError:
                var errCode = async_load[? "code"];
                var errName = async_load[? "name"];
                var errMessage = async_load[? "message"];		
				// Error when requesting a list of account games
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
