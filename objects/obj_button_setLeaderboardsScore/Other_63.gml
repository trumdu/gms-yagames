var i_d = ds_map_find_value(async_load, "id");
if i_d == msg
{
	if ds_map_find_value(async_load, "status")
    {
		if ds_map_find_value(async_load, "result") != ""
        {
			var txt = ds_map_find_value(async_load, "result");
			var st = YaGames_setLeaderboardsScore(txt, 1);
			var msg = "Leaderboards set Score reqId: " + string(st);
		    log(msg);
        }
    }
} 