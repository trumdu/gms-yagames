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
			
            case YaGames_CallLeaderboardsEntries:
                // Leaderboard Entries initialization success
				var _data = json_parse(async_load[? "data"]);
				log("UserRank: " + string(_data.userRank));
				// _data.leaderboard.appID
				// _data.leaderboard.dеfault
				//_data.leaderboard.name
				// _data.ranges[0].start
				// _data.ranges[0].size
				// _data.entries[0].score
				// _data.entries[0].extraData
				// _data.entries[0].rank
				// _data.entries[0].player.publicName
				// _data.entries[0].player.uniqueID
				
            break;
            case YaGames_CallLeaderboardsEntriesError:
                var errCode = async_load[? "code"];
                var errName = async_load[? "name"];
                var errMessage = async_load[? "message"];			
                // Leaderboard Entries initialization error
				
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

