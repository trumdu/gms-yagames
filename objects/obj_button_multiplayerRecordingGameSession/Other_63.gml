var i_d = ds_map_find_value(async_load, "id");
if i_d == msg
{
	if ds_map_find_value(async_load, "status")
    {
		if ds_map_find_value(async_load, "result") != ""
        {
			var _health = ds_map_find_value(async_load, "result");
			var _transaction = { 
				x: irandom(100), 
				y: irandom(100), 
				z: irandom(100),  
				health: real(_health)
			};
			var _transaction_json = json_stringify(_transaction);
			req_id = YaGames_MultiplayerRecordingGameSession(_transaction_json);
			var _msg = "Multiplayer Recording Game Session reqId: " + string(req_id);
		    log(_msg);
        }
    }
} 