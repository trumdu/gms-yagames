var i_d = ds_map_find_value(async_load, "id");
if i_d == msg
{
	if ds_map_find_value(async_load, "status")
    {
		if ds_map_find_value(async_load, "result") != ""
        {
			var _count = 2;
			var _st = ds_map_find_value(async_load, "result");
			var _isEventBased = real(_st) > 0 ? 1 : 0;
			var _maxOpponentTurnTime = 200;
			var _meta = {
				meta1: {
			      min: 0,
			      max: 6000,
			    },
			    meta2: {
			      min: -10,
			      max: 10,
			    },
			    meta3: {
			      min: -999,
			      max: 999,
			    }
			};
			var _meta_json = json_stringify(_meta);
			req_id = YaGames_MultiplayerSessionsInit(_count, _isEventBased, _maxOpponentTurnTime, _meta_json);
			var _msg = "Multiplayer Sessions Init reqId: " + string(req_id);
		    log(_msg);
        }
    }
} 