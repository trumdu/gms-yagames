var i_d = ds_map_find_value(async_load, "id");
if i_d == msg
{
	if ds_map_find_value(async_load, "status")
    {
		if ds_map_find_value(async_load, "result") != ""
        {
			var txt = ds_map_find_value(async_load, "result");
			var st = YaGames_getLeaderboardsPlayerEntry(txt, YaGames_AvatarSizeMedium, YaGames_AvatarSizeSmall);
			var msg = "Leaderboards PlayerEntry reqId: " + string(st);
		    log(msg);
        }
    }
} 