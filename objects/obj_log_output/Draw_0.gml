draw_set_halign(fa_left);
draw_set_valign(fa_top);
draw_set_font(fnt_normal);
draw_set_colour(c_black);
draw_set_alpha(1);
log_height = y;
for (var i = ds_list_size(log_list); i > 0; i -= 1)
{
	var _str = string(ds_list_find_value(log_list, i - 1));
	// exceeding the length of a line of text
	if (string_width_ext(_str, -1, log_max_width) > log_max_width) {
		var _j = 1;
		while (string_width_ext(_str, -1, log_max_width) > log_max_width) {
			var _i = 20;
			var _loc_str = string_copy(_str, _j, _i);
			while (string_width_ext(_loc_str, -1, log_max_width) < log_max_width) {
				_i += 20;
				_loc_str = string_copy(_str, _j, _i);
			}
			while (string_width_ext(_loc_str, -1, log_max_width) > log_max_width) {
				_i -= 1;
				_loc_str = string_copy(_loc_str, 1, _i);
			}
			_str = string_insert("\n", _str, _j + _i);
			_j += _i;
		}
	};
	// output
	draw_text_ext(x, log_height, _str, -1, log_max_width);
	log_height += string_height_ext(_str, -1, log_max_width);
	if (log_height > room_height) {
		break;
	}
}