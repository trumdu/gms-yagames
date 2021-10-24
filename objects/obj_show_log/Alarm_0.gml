if (ds_list_size(text_list) > 0) {
	show_message_async( ds_list_find_value(text_list,0) );
	ds_list_delete(text_list,0);
};