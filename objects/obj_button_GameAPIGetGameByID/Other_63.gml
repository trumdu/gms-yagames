var i_d = ds_map_find_value(async_load, "id");
if i_d == msg
{
	if ds_map_find_value(async_load, "status")
    {
		if ds_map_find_value(async_load, "result") != ""
        {
			var _id = ds_map_find_value(async_load, "result");
			req_id = YaGames_GetGameByID(_id)
			var msg = "Get Game By ID reqId: " + string(req_id);
		    log(msg);
        }
    }
} 