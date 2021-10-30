/// @description Log output to the page
log_list = ds_list_create();
log_height = 0;
log_max_width = room_width - (x * 2);

add_log = function(str) {
	if (ds_exists(log_list, ds_type_list)) {
		var _dt = date_current_datetime();
		var _str = "[";
		var _int = date_get_hour(_dt);
		if (_int < 10) _str += "0";
		_str += string(_int) + ":";
		_int = date_get_minute(_dt);
		if (_int < 10) _str += "0";
		_str += string(_int) + ":";
		_int = date_get_second(_dt);
		if (_int < 10) _str += "0";
		_str += string(_int) + "] " + string(str);
		ds_list_add(log_list, _str);
	}
	else {
		show_message("The data structure was not found.");	
	};
};

log_clear = function() {
	ds_list_clear(log_list);	
}