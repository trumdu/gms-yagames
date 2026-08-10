if (is_clicked) {
	log("isMobile=" + string(YaGames_DeviceInfo_IsMobile())
		+ " isDesktop=" + string(YaGames_DeviceInfo_IsDesktop())
		+ " isTablet=" + string(YaGames_DeviceInfo_IsTablet())
		+ " isTV=" + string(YaGames_DeviceInfo_IsTV()));
	req_id = YaGames_getDeviceType();
	var msg = "DeviceType reqId: " + string(req_id);
    log(msg);
};