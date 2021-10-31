if (is_clicked) {
	var _stats = ds_map_create();
	_stats[? "s1"] = 0.1;
	_stats[? "s2"] = 50;
	_stats[? "s3 "] = 100;
	var stats = json_encode(_stats);
	req_id = YaGames_Player_SetStats(stats);
	var msg = "Player set Stats reqId: " + string(req_id);
	log(msg);
};