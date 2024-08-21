var i_d = ds_map_find_value(async_load, "id");
if i_d == msg
{
	var _scopes = true;
	var _signature = ds_map_find_value(async_load, "status") ? 1 : 0;
	req_id = YaGames_Player_Init(_scopes ? 1 : 0, _signature);
	var _msg = "Player init reqId: " + string(req_id);
    log(_msg);
} 