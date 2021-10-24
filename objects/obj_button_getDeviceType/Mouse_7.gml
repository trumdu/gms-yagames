if (clicked) {
	var st = YaGames_getDeviceType();
	var msg = "";
	switch (st) {
		case YaGames_DeviceDesktop:
			msg += "Device Desktop";
			break;
		case YaGames_DeviceTablet:
			msg += "Device Tablet";
			break;
		case YaGames_DeviceMobile:
			msg += "Device Mobile";
			break;
		case YaGames_DeviceUndefined:
			msg += "Device Undefined";
			break;
		default:
			msg += "Device check error: " + string(st);
	}
    log(msg);
};