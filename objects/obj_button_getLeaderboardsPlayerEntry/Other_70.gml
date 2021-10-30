/// @description Parse YaGames events
if (not isMap(async_load)) {
    log("async_load got lost in cyberspace");
} else {
    if ((async_load[? "type"] == "YaGames") and (async_load[? "request_id"] == req_id)) {
		// Logging
        var _msg = json_encode(async_load);
        log(_msg);
		//
        switch (async_load[? "event"]) {	
			
            case "leaderboardsPlayerEntry":
                // Leaderboard Player Entry initialization success
                var lb_data = async_load[? "data"];
            break;
            case "leaderboardsPlayerEntryError":
                var errCode = async_load[? "code"];
                var errName = async_load[? "name"];
                var errMessage = async_load[? "message"];			
                // Leaderboard  Player Entry initialization error
            break;
            case "leaderboardsPlayerNotPresent":
                var errCode = async_load[? "code"];
                var errName = async_load[? "name"];
                var errMessage = async_load[? "message"];			
                // Leaderboard. No user data
            break;
			
            case "notLeaderboardInitSDK":
                // Leaderboard in SDK not initialized
            break;
            case "notInitSDK":
                // SDK not initialized
            break;
            case "RuntimeError":
                var errCode = async_load[? "code"];
                var errName = async_load[? "name"];
                var errMessage = async_load[? "message"];	
                // SDK runtime error
            break;
        }
   }
}

