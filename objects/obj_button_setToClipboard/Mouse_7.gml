if (is_clicked) {
	var _st = get_logs();
	req_id = YaGames_setToClipboard(_st);
	var _msg = "Clipboard set reqId: " + string(req_id);
    log(_msg);
};