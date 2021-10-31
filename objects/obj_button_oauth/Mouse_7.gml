if (is_clicked) {
	req_id = YaGames_OpenAuthDialog();
	var msg = "Authorization reqId: " + string(req_id);
    log(msg);
};