var i_d, stat;
i_d = ds_map_find_value(async_load, "id");
if (i_d == quest)
{
    var _st = (ds_map_find_value(async_load, "status")) ? 1 : 0;
	req_id = YaGames_Payments_Init(_st);
	var msg = "Payments init reqId: " + string(req_id) + ", signed: " + (_st ? "true" : "false");
    log(msg);
}