if (is_clicked) {
	// The function returns a timestamp in milliseconds
	var _timestamp_ms = YaGames_getServerTime();
	if (_timestamp == 0) {
	    log("Error receiving server time");
	}
	else {
	    log("Server Timestamp: " + string(_timestamp_ms));
		// The function accepts a timestamp in seconds
		var _dt = convert_unixtime(_timestamp_ms / 1000);
		var _msg = "Server DateTime: " + convert_datetime_to_iso8601(_dt);
	    log(_msg);
	}
};