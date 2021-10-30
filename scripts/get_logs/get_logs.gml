function get_logs() {
	var _str = "";
	for (var i = ds_list_size(obj_log_output.log_list); i > 0; i -= 1)
	{
		if (i != ds_list_size(obj_log_output.log_list)) _str += "\n";
		_str += ds_list_find_value(obj_log_output.log_list, i - 1);
	}
	return _str;
}