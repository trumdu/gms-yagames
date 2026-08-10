if (is_clicked) {
	req_id = YaGames_Storage_SetItem("yg_demo_key", "hello_" + string(current_time));
	log("Storage SetItem reqId: " + string(req_id));
};
