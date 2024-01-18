if (is_clicked) {
	req_id = YaGames_Event_Dispatch(YaGames_Event_HISTORY_BACK);
	var msg = "Event Dispatch reqId: " + string(req_id);
    log(msg);
};