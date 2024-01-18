if (is_clicked) {
	req_id = YaGames_Payments_GetPurchases();
	var msg = "Payments GetPurchases reqId: " + string(req_id);
	log(msg);
};