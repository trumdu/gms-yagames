if (is_clicked) {
	var flush = 1;
	var _data = ds_map_create();
	_data[? "health"] = 50;
	_data[? "energy"] = 50;
	_data[? "stealth "] = "hidden";
	var data = json_encode(_data);
	req_id = YaGames_Player_SetData(data, flush);
	var msg = "Player set Data reqId: " + string(req_id);
	log(msg);
};