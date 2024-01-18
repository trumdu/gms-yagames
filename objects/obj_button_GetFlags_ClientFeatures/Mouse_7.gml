if (is_clicked) {
	var _client_features = {
		levels: 5,
		bparam: "bvalue"
	};
	var _t = json_stringify(_client_features);
	req_id = YaGames_GetFlags("", _t);
	var msg = "Get Flags Client Features reqId: " + string(req_id);
    log(msg);
};