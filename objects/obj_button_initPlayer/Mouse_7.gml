if (is_clicked) {
	var scopes = true;
	req_id = YaGames_Player_Init((scopes ? 1 : 0));
	var msg = "Player init reqId: " + string(req_id);
    log(msg);
};