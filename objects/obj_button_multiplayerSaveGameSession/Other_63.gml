var i_d = ds_map_find_value(async_load, "id");
if i_d == msg
{
	if ds_map_find_value(async_load, "status")
    {
		if ds_map_find_value(async_load, "result") != ""
        {
			var _row = ds_map_find_value(async_load, "result");
			var _meta = { 
				meta1: 12, 
				meta2: -2,
				meta3: real(_row),
			};
			var _meta_json = json_stringify(_meta);
			req_id = YaGames_MultiplayerSaveGameSession(_meta_json);
			var _msg = "Multiplayer Save Game Session reqId: " + string(req_id);
		    log(_msg);
        }
    }
} 