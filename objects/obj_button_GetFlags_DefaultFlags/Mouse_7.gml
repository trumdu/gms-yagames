if (is_clicked) {
	var _default_flags = {
		difficult: "easy",
		test3: "55"
	};
	var _t = json_stringify(_default_flags);
	req_id = YaGames_GetFlags(_t);
	var msg = "Get Flags Default reqId: " + string(req_id);
    log(msg);
};