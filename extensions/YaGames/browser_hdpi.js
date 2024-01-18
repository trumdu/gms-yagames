/**
 *
 * @returns {number|number}
 */
function browser_get_device_pixel_ratio() {
	return window.devicePixelRatio || 1;
}

/**
 *
 * @param canvas_id
 * @param w
 * @param h
 */
function browser_stretch_canvas_ext(canvas_id, w, h) {
	let el = document.getElementById(canvas_id);
	el.style.width = w + "px";
	el.style.height = h + "px";
}

/**
 *
 * @param z
 */
function browser_scrollbars_enable(z) {
	document.body.style.overflow = z ? "" : "hidden";
}