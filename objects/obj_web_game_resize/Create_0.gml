// Объект монопольный
if (os_browser == browser_not_a_browser) {
	instance_destroy();
	exit;
};
with (obj_web_game_resize) {
	if (id != other.id) {
		instance_destroy();
		exit;
	}
}
// Ширина и высота
base_width = room_width;
base_height = room_height;
width = base_width;
height = base_height;
browser_scrollbars_enable(false);
// Updating the screen resolution
screen_resolution_upd = function () {
	var _w = browser_width;
	var _h = browser_height;

	var _aspect = (base_width / base_height);

	// find screen pixel dimensions:
	var _rz = browser_get_device_pixel_ratio();
	var _cw = _w * _rz;
	var _ch = _h * _rz;

	var _rw = 1;
	var _rh = 1;

	if ((_cw / _aspect) > _ch) {
		_rw = _ch *_aspect;
		_rh = _ch;
		_w = _h * _aspect;
	}
	else {
		_rw = _cw;
		_rh = _cw / _aspect;
		_h = _w / _aspect;
	}
		
	//
	window_set_size(_rw, _rh);
	window_center();
	browser_stretch_canvas(_w, _h);
}
screen_resolution_upd();