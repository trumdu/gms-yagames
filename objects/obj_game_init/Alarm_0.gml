/// @description Checking the SDK ready
if (max_waiting_seconds > 0) {
	if (YaGames_getInitStatus() > 0) {
		// Initializing Player data
		// We recommend sending a message about the ready of the game after all the data is ready.
		YaGames_GameReadyOn();
		room_goto(room_demo);
	}
}
else {
	if (YaGames_getBrowserLang() == "ru") {
		show_message_async("Ошибка ожидания инициализации SDK");
	}
	else {
		show_message_async("SDK initialization waiting error");
	}
	room_goto(room_demo);
}
max_waiting_seconds -= 1;
//alarm[0] = room_speed;
alarm[0] = game_get_speed(gamespeed_fps);

