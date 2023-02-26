if (is_clicked) {
	req_id = YaGames_Payments_GetCatalog();
	var msg = "Payments GetCatalog reqId: " + string(req_id);
	log(msg);
};