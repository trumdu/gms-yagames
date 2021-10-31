if (is_clicked) {
	var _stats = ds_map_create();
	_stats[? "s1"] = 3;
	_stats[? "s3 "] = 33;
	var stats = json_encode(_stats);
	req_id = YaGames_Player_IncrementStats(stats);
	var msg = "Player Increment Stats reqId: " + string(req_id);
	log(msg);
};