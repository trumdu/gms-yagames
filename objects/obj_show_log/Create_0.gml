text_list = ds_list_create();
add_log = function(log_message) {
	ds_list_add(text_list,string(log_message));
	alarm[0] = 1;
}