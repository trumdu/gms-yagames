// A special "hack" for registering the GML_send_async_event_social callback. Used for YYC compiled project.
// triggerPayment is executed when gxc_payment is called in NOGX.gml.
function triggerPayment(itemId, _callback_PaymentComplete) {
	if(itemId==="#GMS_API_async_event_social") {
		var pRValueCopy = triggerPaymentPrefix(_callback_PaymentComplete);
		triggerPaymentPostfix();
		GMS_API.__GML_send_async_event_social_ADDR = pRValueCopy;
	}
}

// Allow keyboard input when typing elements are active

function __NOGX_is_typing_active() {
	const activeEl = document.activeElement;
	
	if (!activeEl) return false;

	const isEditable = 
		activeEl.tagName === 'INPUT' || 
		activeEl.tagName === 'TEXTAREA' || 
		activeEl.isContentEditable;

	// exclude buttons, checkboxes and radio-buttons
	if (activeEl.tagName === 'INPUT' && 
		['button', 'submit', 'reset', 'checkbox', 'radio'].includes(activeEl.type)) {
		return false;
	}

	return isEditable;
}

window.addEventListener('keydown', e => {
	if(__NOGX_is_typing_active()) {
		e.stopImmediatePropagation();
	}
}, true);

window.addEventListener('keyup', e => {
	if(__NOGX_is_typing_active()) {
		e.stopImmediatePropagation();
	}
}, true);

// GMS_API available in HTML5 export but for GX(WASM).
// Required to call the GMS_API.send_async_event_social
var GMS_API = {
	__GML_send_async_event_social_ADDR: undefined,
	
	send_async_event_social: function(map) {
		if(!__NOGX_ready) {
			return;
		}
		
		// for YYC
		if(this.__GML_send_async_event_social_ADDR!==undefined) {
			doGMLCallback(this.__GML_send_async_event_social_ADDR, map);
			return;
		}
		
		// for VM
		const GML = __js_get_gml();
		const gmMap = GML.ds_map_create();
		Object.keys(map).forEach(key => {
			GML.ds_map_add(undefined, undefined, gmMap, key, map[key]);
		});
		GML.event_perform_async(undefined, undefined, 70, gmMap);
	}
}

if (typeof __NOGX_ready === 'undefined') {
	var __NOGX_ready = false;
}
var __NOGX_canvasSizeW = 640;
var __NOGX_canvasSizeH = 360;
var __NOGX_limitAspectRatio = false;
var __NOGX_minAspectRatio = 16/9;
var __NOGX_maxAspectRatio = 16/9;

function __NOGX_make_even_positive(value, fallback) {
	var v = Math.floor(value);
	if(v < 1) {
		v = fallback;
	}
	if(v % 2 !== 0) {
		v -= 1;
	}
	return v > 0 ? v : fallback;
}

function __NOGX_get_default_canvas_size() {
	const defaultW = 640;
	const defaultH = 360;
	
	if(!__NOGX_limitAspectRatio) {
		return { w: defaultW, h: defaultH };
	}
	
	var minAsp = __NOGX_minAspectRatio;
	var maxAsp = __NOGX_maxAspectRatio;
	var defaultAsp = defaultW / defaultH;
	
	if(!isFinite(minAsp) || minAsp <= 0) minAsp = defaultAsp;
	if(!isFinite(maxAsp) || maxAsp <= 0) maxAsp = defaultAsp;
	if(minAsp > maxAsp) {
		var temp = minAsp;
		minAsp = maxAsp;
		maxAsp = temp;
	}
	
	var asp = Math.min(Math.max(defaultAsp, minAsp), maxAsp);
	var w = defaultW;
	var h = defaultH;
	
	if(asp >= 1) {
		h = Math.floor(w / asp);
	} else {
		w = Math.floor(h * asp);
	}
	
	w = __NOGX_make_even_positive(w, defaultW);
	h = __NOGX_make_even_positive(h, defaultH);
	
	return { w: w, h: h };
}

function __NOGX_init(limitAspectRatio, minAsp, maxAsp) {
	__NOGX_limitAspectRatio = limitAspectRatio;
	__NOGX_minAspectRatio = minAsp;
	__NOGX_maxAspectRatio = maxAsp;
	__NOGX_ready = true;
	__NOGX_update_canvas_size();
}

function __NOGX_update_canvas_size() {
	const canvasElement = Module.canvas;
	const dpr = window.devicePixelRatio || 1;
	const w = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) * dpr;
	const h = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) * dpr;
	const wFloor = Math.floor(w);
	const hFloor = Math.floor(h);
	
	let screenW = wFloor;
	let screenH = hFloor;
	const useFallback = (wFloor <= 0 || hFloor <= 0);
	
	if(useFallback) {
		const fallbackSize = __NOGX_get_default_canvas_size();
		screenW = fallbackSize.w;
		screenH = fallbackSize.h;
		console.warn(
			"NOGX: fallback canvas size applied in __NOGX_update_canvas_size",
			{ width: wFloor, height: hFloor, fallbackWidth: screenW, fallbackHeight: screenH }
		);
	}
	
	if(__NOGX_limitAspectRatio && !useFallback) {
		const asp = wFloor/hFloor;
		var aspLimited = Math.min(Math.max(asp, __NOGX_minAspectRatio), __NOGX_maxAspectRatio);
		if(asp/aspLimited>=1) {
			screenW = Math.floor(screenH * aspLimited);
		} else {
			screenH = Math.floor(screenW / aspLimited);
		}
	}
	
	// blur fix:
	const screenWFix = screenW % 2 !== 0 ? screenW - 1 : screenW;
	const screenHFix = screenH % 2 !== 0 ? screenH - 1 : screenH;
	
	__NOGX_canvasSizeW = screenWFix;
	__NOGX_canvasSizeH = screenHFix;
	
	canvasElement.style.width = (screenWFix/dpr) + "px";
	canvasElement.style.height = (screenHFix/dpr) + "px";
}

function __NOGX_get_canvas_width() {
	if(__NOGX_canvasSizeW <= 0 || __NOGX_canvasSizeH <= 0) {
		return __NOGX_get_default_canvas_size().w;
	}
	return __NOGX_canvasSizeW;
}

function __NOGX_get_canvas_height() {
	if(__NOGX_canvasSizeW <= 0 || __NOGX_canvasSizeH <= 0) {
		return __NOGX_get_default_canvas_size().h;
	}
	return __NOGX_canvasSizeH;
}

function __NOGX_is_ready() {
	return __NOGX_ready;
}

function __NOGX_stretch_canvas_ext(canvas_id, w, h) {
	var el = document.getElementById(canvas_id);
	if(!el) {
		return;
	}
	el.style.width = w + "px";
	el.style.height = h + "px";
}

function __NOGX_scrollbars_enable(z) {
	document.body.style.overflow = z ? "" : "hidden";
}
