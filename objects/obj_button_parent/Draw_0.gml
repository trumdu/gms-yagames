if (is_disabled) {
	draw_sprite(sprite_index, 1, x, y);
}
else {
	draw_sprite(sprite_index, (is_clicked ? 1 : 0), x, y);
}
draw_set_halign(fa_center);
draw_set_valign(fa_middle);
draw_set_font(fnt_normal);
draw_set_colour(c_white);
draw_set_alpha(1);
var _w = round(sprite_width * 1) / string_width(text);
if (_w > 1) _w = 1;
var _h = round(sprite_height * 1) / string_height(text);
if (_h > 1) _h = 1;
draw_text_transformed(x + round(sprite_width / 2), y + round(sprite_height / 2), text, _w, _h, 1);