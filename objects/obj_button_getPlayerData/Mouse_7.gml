if (is_clicked) {
	var a_keys = array_create(2);
	a_keys[0] = "health";
	a_keys[1] = "energy";
	var keys = json_stringify(a_keys);
	req_id = YaGames_Player_GetData(keys);
	var msg = "Player Data reqId: " + string(req_id);
	log(msg);
};