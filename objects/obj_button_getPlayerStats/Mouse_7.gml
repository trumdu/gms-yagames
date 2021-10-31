if (is_clicked) {
	var a_keys = array_create(2);
	a_keys[0] = "s1";
	a_keys[1] = "s2";
	var keys = json_stringify(a_keys);
	req_id = YaGames_Player_GetStats(keys);
	var msg = "Player Stats reqId: " + string(req_id);
	log(msg);
};