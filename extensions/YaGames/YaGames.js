// Async Yandex Games SDK 2 
(function(d) {
	console.log('Yandex SDK start load script');
	var t = d.getElementsByTagName('script')[0];
	var s = d.createElement('script');
	s.src = 'https://yandex.ru/games/sdk/v2';
	s.async = true;
	t.parentNode.insertBefore(s, t);
	s.onload = YaGamesGMS_SdkInit;
})(document);

var YaGamesGMS = {
	_mapTypeDesc: "YaGames",
	_notInitEvent: "notInitSDK",
	_notInitDesc: "SDK not Inited",
	_allowConsoleDebug: false,
	_request_id: 0,
	_ysdk: null,
	_lb: null,

	toErrStr: function (err) {
		return (err + "");
	},

	parseJson: function (json) {
		try {
			return JSON.parse(json);
		} catch (e) {
			return null;
		}
	},

	browserConsoleLog: function (message, request_id) {
		if (YaGamesGMS._allowConsoleDebug) {
			if (request_id >= 0) {
				console.log("Request " + request_id + ": " + message);
			}
			else {
				console.log(message);
			}
		}
	},

	newRequest: function () {
		return ++YaGamesGMS._request_id;
	},

	send: function (request_id, event, message) {
		let self = YaGamesGMS;

		let map = {};
		map["type"] = String(self._mapTypeDesc);
		map["request_id"] = Number(request_id);
		if (isNaN(map["request_id"])) map["request_id"] = -1;
		map["event"] = String(event);

		switch (typeof message) {
			case "undefined":
				// empty
				break;
			case "number":
				map["value"] = message;
				break;
			case "string":
				map["value"] = message;
				break;
			case "object":
				map["data"] = message;
				break;
			case "boolean":
				map["value"] = message;
				break;
			default:
				console.warn("Unsupported message format: " + typeof message);
		}

		GMS_API.send_async_event_social(map);

	},

	delaySend: function (request_id, event, message) {
		setTimeout(() => {
			YaGamesGMS.send(request_id, event, message);
		}, 0);
	},

	getInitStatus: function () {
		let self = YaGamesGMS;
		if (self._ysdk === null) {
			self.browserConsoleLog("SDK not Inited");
			return false;
		}
		else {
			self.browserConsoleLog("SDK is Inited");
			return true;
		}
	}
}

/**
 * Reloading the browser page
 */
function YaGamesGML_pageReload() {
	YaGamesGMS.browserConsoleLog( "Reloading the browser page");
	window.location.reload(true);
}

/**
 * Script is loaded. Initialization SDK.
 */
function YaGamesGMS_SdkInit() {
	let self = YaGamesGMS;
	YaGames.init().then(ysdk => {
		console.log('Yandex SDK initialized');
		self._ysdk = ysdk;
	});
}

/**
 * Allow log output to the browser console
 * @param {Number} debugStatus
 */
function YaGamesGMS_setDebugMode(debugStatus) {
	let self = YaGamesGMS;
	if (debugStatus > 0) {
		console.log("Browser debug mode enabled");
		self._allowConsoleDebug = true;
	}
	else {
		self._allowConsoleDebug = false;
	}
}

/**
 * Get the SDK initialization status
 * @returns  1 0
 */
function YaGamesGMS_getInitStatus() {
	return YaGamesGMS.getInitStatus() ? 1 : 0;
}

/**
 * Browser priority language
 * @returns {String}
 */
function YaGamesGML_getBrowserLang() {
	let brLang = navigator.language || navigator.userLanguage;
	YaGamesGMS.browserConsoleLog( "Browser priority language: " + brLang);
	return brLang;
}

/**
 * Get the device type
 * @returns {String}
 */
function YaGamesGML_getDeviceType() {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "Device type request", req_id);
		if (!self.getInitStatus()) {
			self.send(req_id, self._notInitEvent, self._notInitDesc);
		}
		else {
			try {
				let dev_type = self._ysdk.deviceInfo.type;
				self.send(req_id, "deviceType", dev_type);
				self.browserConsoleLog( "Device type: " + dev_type, req_id);
			} catch (err) {
				let err_txt = self.toErrStr(err);
				self.delaySend(req_id, "RuntimeError", err_txt);
				self.browserConsoleLog( "Device type runtime error: " + err_txt, req_id);
			}
		}
	}, 0);
	return req_id;
}

/**
 * Yandex.Game interface language
 * @returns {String}
 */
function YaGamesGML_getEnvironment() {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "Environment request", req_id);
		if (!self.getInitStatus()) {
			self.send(req_id, self._notInitEvent, self._notInitDesc);
		}
		else {
			try {
				let envDt = self._ysdk.environment;
				self.send(req_id, "environment", envDt);
				self.browserConsoleLog( "Environment: " + envDt, req_id);
			} catch (err) {
				let err_txt = self.toErrStr(err);
				self.delaySend(req_id, "RuntimeError", err_txt);
				self.browserConsoleLog( "Environment runtime error: " + err_txt, req_id);
			}
		}
	}, 0);
	return req_id;
}

/**
 * Request to show fullscreen ads
 * @returns {Number}
 */
function YaGamesGMS_showFullscreenAdv() {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "FullScreen Ads requested", req_id);
		if (!self.getInitStatus()) {
			self.send(req_id, self._notInitEvent, self._notInitDesc);
		}
		else {
			try {
				self._ysdk.adv.showFullscreenAdv({
					callbacks: {
						onClose: (wasShown) => {
							let map = {};
							map["wasShown"] = wasShown;
							self.send(req_id, "adClosed", map);
							self.browserConsoleLog( "FullScreen Ads closed. Was shown: " + wasShown, req_id);
						},
						onOpen: () => {
							self.send(req_id, "adOpened");
							self.browserConsoleLog( "FullScreen Ads opened.", req_id);
						},
						onOffline: () => {
							self.send(req_id, "offlineMode");
							self.browserConsoleLog( "FullScreen Ads. Offline mode.", req_id);
						},
						onError: (err) => {
							let err_txt = self.toErrStr(err);
							self.send(req_id, "adError", err_txt);
							self.browserConsoleLog( "Failed FullScreen Ads show: " + err_txt, req_id);
						},
					},
				});
			} catch (err) {
				let err_txt = self.toErrStr(err);
				self.delaySend(req_id, "RuntimeError", err_txt);
				self.browserConsoleLog( "FullScreen Ads runtime error: " + err_txt, req_id);
			}
		}
	}, 0);
	return req_id;
}

/**
 * Request to show rewarded video ads
 * @returns {Number}
 */
function YaGamesGMS_showRewardedVideo() {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "FullScreen ad requested", req_id);
		if (!self.getInitStatus()) {
			self.send(req_id, self._notInitEvent, self._notInitDesc);
		}
		else {
			try {
				self._ysdk.adv.showRewardedVideo({
					callbacks: {
						onOpen: () => {
							self.send(req_id, "rewardOpened");
							self.browserConsoleLog( "Reward ad opened.", req_id);
						},
						onRewarded: () => {
							self.send(req_id, "rewardReceived");
							self.browserConsoleLog( "Rewarded!", req_id);
						},
						onClose: () => {
							self.send(req_id, "rewardClosed");
							self.browserConsoleLog( "Reward ad closed.", req_id);
						},
						onError: (err) => {
							let err_txt = self.toErrStr(err);
							self.send(req_id, "rewardError", err_txt);
							self.browserConsoleLog( "Reward ad show failed: " + + err_txt, req_id);
						},
					},
				});
			} catch (err) {
				let err_txt = self.toErrStr(err);
				self.delaySend(req_id, "RuntimeError", err_txt);
				self.browserConsoleLog( "Reward runtime error: " + err_txt, req_id);
			}
		}
	}, 0);
	return req_id;
}

/**
 * Copying the text to the clipboard
 * @param {string} ctext
 */
function YaGamesGML_setToClipboard(ctext) {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "Clipboard request", req_id);
		if (!self.getInitStatus()) {
			self.send(req_id, self._notInitEvent, self._notInitDesc);
		}
		else {
			try {
				let text = String(ctext);
				self._ysdk.clipboard.writeText(text)
					.then(() => {
						self.send(req_id, "ClipboardSuccess");
						self.browserConsoleLog( "Text copied to clipboard: " + text, req_id);
					})
					.catch((err) => {
						let err_txt = self.toErrStr(err);
						self.send(req_id, "ClipboardError", err_txt);
						self.browserConsoleLog( "Clipboard error: " + err_txt, req_id);
					});
			} catch (err) {
				let err_txt = self.toErrStr(err);
				self.delaySend(req_id, "RuntimeError", err_txt);
				self.browserConsoleLog( "Clipboard runtime error: " + err_txt, req_id);
			}
		}
	}, 0);
	return req_id;
}