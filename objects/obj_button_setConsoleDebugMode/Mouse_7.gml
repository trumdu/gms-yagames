if (is_clicked) {
	var _is_browser_enabled = is_browser_enabled ? 0 : 1;
	var _st = YaGames_setDebugMode(_is_browser_enabled);
	var _msg = "Browser debugging enabled: ";
	if (_st > 0) {
		is_browser_enabled = 1;
		_msg += "true";
	}
	else {
		is_browser_enabled = 0;
		_msg +="false";
	}
    log(_msg);
};