/// @description Parse YaGames events
if (not isMap(async_load)) {
    log("async_load got lost in cyberspace");
} else {
	// The "game_api_pause" and "game_api_resume" notifications 
	// always arrive with a request_id of 42 (YaGames_RequestIdGameApi)
    if ((async_load[? "type"]== YaGames_AsyncEvent) and (async_load[? "request_id"] == YaGames_RequestIdGameApi)) {
		// 
		var _msg = "";
        switch (async_load[? "event"]) {	
			
			case YaGames_CallGameApiPause:
					text = text_base + "Pause";
			        _msg = json_encode(async_load);
			        log(_msg);
			break;
			
            case YaGames_CallGameApiResume:
					text = text_base + "Resume";
			        _msg = json_encode(async_load);
			        log(_msg);
            break;
        }
   }
}
