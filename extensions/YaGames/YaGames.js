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
		map["type"] = self._mapTypeDesc + "";
		map["request_id"] = +request_id;
		if (isNaN(map["request_id"])) map["request_id"] = -1;
		map["event"] = event + "";

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
		return YaGamesGMS._ysdk !== null;
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
		console.log("Browser debug mode disabled");
		self._allowConsoleDebug = false;
	}
}

/**
 * Get the SDK initialization status
 * @returns  1 0
 */
function YaGamesGMS_getInitStatus() {
	let self = YaGamesGMS;
	if (self.getInitStatus()) {
		self.browserConsoleLog("SDK is Inited");
		return 1;
	}
	else {
		self.browserConsoleLog("SDK not Inited");
		return 0;
	}
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
 * @returns {Number} Request_id
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
 * Yandex.Game Environment
 * @returns {Number} Request_id
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
 * @returns {Number} Request_id
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
 * @returns {Number} Request_id
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
 * @returns {Number} Request_id
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
				let text = ctext + "";
				self._ysdk.clipboard.writeText(text)
					.then(() => {
						self.send(req_id, "clipboardSuccess");
						self.browserConsoleLog( "Text copied to clipboard: " + text, req_id);
					})
					.catch((err) => {
						let err_txt = self.toErrStr(err);
						self.send(req_id, "clipboardError", err_txt);
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

/**
 * Leaderboard object Initialization
 * @param request_id
 * @returns {boolean}
 */
function YaGamesGML_Leaderboards_init(request_id) {
	let self = YaGamesGMS;
	if (self._lb === null) {
		try {
			self._ysdk.getLeaderboards()
				.then((lb) => {
					self._lb = lb;
					return true;
				})
				.catch((err) => {
					let err_txt = self.toErrStr(err);
					self.send(request_id, "leaderboardsInitError", err_txt);
					self.browserConsoleLog( "Leaderboards init failed: " + + err_txt, request_id);
				});
		} catch (err) {
			let err_txt = self.toErrStr(err);
			self.delaySend(request_id, "RuntimeError", err_txt);
			self.browserConsoleLog( "Leaderboard init runtime error: " + err_txt, request_id);
		}
		return false;
	}
	else {
		return true;
	}
}

/**
 * Get a description of the Leaderboard
 * @param cleaderboard_name
 * @returns {Number} Request_id
 */
function YaGamesGML_Leaderboards_getByDescription(cleaderboard_name) {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		let leaderboard_name = cleaderboard_name + "";
		self.browserConsoleLog( "Leaderboard " + leaderboard_name + " requested", req_id);
		if (!self.getInitStatus()) {
			self.send(req_id, self._notInitEvent, self._notInitDesc);
		}
		else {
			if (YaGamesGML_Leaderboards_init(req_id)) {
				try {
					self._lb.getLeaderboardDescription(leaderboard_name)
						.then((result) => {
							self.send(req_id, "leaderboardsRequest", result);
							self.browserConsoleLog( "Leaderboards requested.", req_id);
						})
						.catch((err) => {
							let err_txt = self.toErrStr(err);
							self.send(req_id, "leaderboardsRequestError", err_txt);
							self.browserConsoleLog( "Leaderboard " + leaderboard_name + " requested failed: " + + err_txt, req_id);
						});
				} catch (err) {
					let err_txt = self.toErrStr(err);
					self.delaySend(req_id, "RuntimeError", err_txt);
					self.browserConsoleLog( "Leaderboard " + leaderboard_name + " requested runtime error: " + err_txt, req_id);
				}
			}
		}
	}, 0);
	return req_id;
}

/**
 * User rating in the Leaderboards
 * @param cleaderboard_name
 * @param cavatarSrcSize User portrait URL. Possible size values are small, medium, and large.
 * @param cavatarSrcSetSize Srcset of a user portrait that is suitable for Retina displays. Possible values for size: small, medium and large
 * @returns {Number} Request_id
 */
function YaGamesGML_Leaderboards_getPlayerEntry(
	cleaderboard_name,
	cavatarSrcSize,
	cavatarSrcSetSize
){
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		let leaderboard_name = cleaderboard_name + "";
		self.browserConsoleLog( "Leaderboard " + leaderboard_name + " PlayerEntry requested", req_id);
		if (!self.getInitStatus()) {
			self.send(req_id, self._notInitEvent, self._notInitDesc);
		}
		else {
			if (YaGamesGML_Leaderboards_init(req_id)) {
				try {
					self._lb
						.getLeaderboardPlayerEntry(leaderboard_name)
						.then((result) => {
							let avatarSrcSize = cavatarSrcSize + "";
							let avatarSrcSetSize = cavatarSrcSetSize + "";
							if (avatarSrcSize && result.player) {
								result.player.getAvatarSrc = result.player.getAvatarSrc(avatarSrcSize);
							}
							if (avatarSrcSetSize && result.player) {
								result.player.getAvatarSrcSet = result.player.getAvatarSrcSet(avatarSrcSetSize);
							}
							self.send(req_id, "leaderboardsPlayerEntry", result);
							self.browserConsoleLog("Leaderboards PlayerEntry loaded: " + result, req_id);
						})
						.catch((err) => {
							let err_txt = self.toErrStr(err);
							if (err.code === 'LEADERBOARD_PLAYER_NOT_PRESENT') {
								self.send(req_id, "leaderboardsPlayerNotPresent", err_txt);
							} else {
								self.send(req_id, "leaderboardsPlayerEntryError", err_txt);
							}
							self.browserConsoleLog("Leaderboards PlayerEntry failed: " + err_txt, req_id);
						});
				} catch (err) {
					let err_txt = self.toErrStr(err);
					self.delaySend(req_id, "RuntimeError", err_txt);
					self.browserConsoleLog("Leaderboard " + leaderboard_name + " PlayerEntry runtime error: " + err_txt, req_id);
				}
			}
		}
	}, 0);
	return req_id;
}

/**
 * Get the rating of multiple users
 * @param cleaderboard_name
 * @param cavatarSrcSize User portrait URL. Possible size values are small, medium, and large.
 * @param cavatarSrcSetSize Srcset of a user portrait that is suitable for Retina displays. Possible values for size: small, medium and large
 * @param cincludeUser Add authorized user to response: true / false
 * @param cquantityAround The number of records below and above the user in the table to be returned. The minimum value is 1, the maximum is 10.
 * @param cquantityTop The number of records from the top of the table. The minimum value is 1, the maximum is 20.
 * @returns {Number} Request_id
 */
function YaGamesGML_Leaderboards_getEntries_options(
	cleaderboard_name,
	cavatarSrcSize,
	cavatarSrcSetSize,
	cincludeUser = 0,
	cquantityAround = 5,
	cquantityTop = 5
){
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		let leaderboard_name = cleaderboard_name + "";
		self.browserConsoleLog( "Leaderboard " + leaderboard_name + " Entries requested", req_id);
		if (!self.getInitStatus()) {
			self.send(req_id, self._notInitEvent, self._notInitDesc);
		}
		else {
			if (YaGamesGML_Leaderboards_init(req_id)) {
				try {
					let includeUser = cincludeUser > 0;
					let quantityAround = (cquantityAround < 1) ? 1 : ((cquantityAround > 10) ? 10 : cquantityAround);
					let quantityTop = (cquantityTop < 1) ? 1 : ((cquantityTop > 20) ? 20 : cquantityTop);
					self._lb
						.getLeaderboardEntries(leaderboard_name, includeUser, quantityAround, quantityTop)
						.then((result) => {
							let avatarSrcSize = cavatarSrcSize + "";
							let avatarSrcSetSize = cavatarSrcSetSize + "";
							if (result.entries) {
								for (let i = 0; i < result.entries.length; i++) {
									let entry = result.entries[i];
									if (avatarSrcSize) {
										entry.player.getAvatarSrc = entry.player.getAvatarSrc(avatarSrcSize);
									}
									if (avatarSrcSetSize) {
										entry.player.getAvatarSrcSet = entry.player.getAvatarSrcSet(avatarSrcSetSize);
									}
								}
							}
							self.send(req_id, "leaderboardsEntries", result);
							self.browserConsoleLog("Leaderboards Entries loaded: " + result, req_id);
						})
						.catch((err) => {
							let err_txt = self.toErrStr(err);
							self.send(req_id, "leaderboardsEntriesError", err_txt);
							self.browserConsoleLog("Leaderboards Entries failed: " + err_txt, req_id);
						});
				} catch (err) {
					let err_txt = self.toErrStr(err);
					self.delaySend(req_id, "RuntimeError", err_txt);
					self.browserConsoleLog("Leaderboard " + leaderboard_name + " Entries runtime error: " + err_txt, req_id);
				}
			}
		}
	}, 0);
	return req_id;
}

/**
 * Get the rating of multiple users
 * @param cleaderboard_name
 * @param cavatarSrcSize User portrait URL. Possible size values are small, medium, and large.
 * @param cavatarSrcSetSize Srcset of a user portrait that is suitable for Retina displays. Possible values for size: small, medium and large
 * @returns {Number} Request_id
 */
function YaGamesGML_Leaderboards_getEntries(
	cleaderboard_name,
	cavatarSrcSize,
	cavatarSrcSetSize
){
	return YaGamesGML_Leaderboards_getEntries_options(cleaderboard_name, cavatarSrcSize, cavatarSrcSetSize);
}

/**
 * Add new result to Leaderboard
 * @param cleaderboard_name
 * @param cscore The value of the result. It cannot be negative. If the table type is time, then the values must be transmitted in milliseconds.
 * @param cextra_data User description.
 * @returns {Number} Request_id
 */
function YaGamesGML_Leaderboards_setScore_extraData(cleaderboard_name, cscore, cextra_data = "") {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		let leaderboard_name = cleaderboard_name + "";
		self.browserConsoleLog( "Leaderboard " + leaderboard_name + " SetScore requested", req_id);
		if (!self.getInitStatus()) {
			self.send(req_id, self._notInitEvent, self._notInitDesc);
		}
		else {
			if (YaGamesGML_Leaderboards_init(req_id)) {
				try {
					let promise;
					let extra_data = cextra_data + "";
					let score = +cscore;
					if (extra_data.length > 0) {
						promise = self._lb.setLeaderboardScore(leaderboard_name, score, extra_data);
					} else {
						promise = self._lb.setLeaderboardScore(leaderboard_name, score);
					}
					promise
						.then((result) => {
							self.send(req_id, "leaderboardsSetScore", result);
							self.browserConsoleLog( "Leaderboards SetScore success.", req_id);
						})
						.catch((err) => {
							let err_txt = self.toErrStr(err);
							self.send(req_id, "leaderboardsSetScoreError", err_txt);
							self.browserConsoleLog( "Leaderboard " + leaderboard_name + " SetScore failed: " + + err_txt, req_id);
						});
				} catch (err) {
					let err_txt = self.toErrStr(err);
					self.delaySend(req_id, "RuntimeError", err_txt);
					self.browserConsoleLog( "Leaderboard " + leaderboard_name + " SetScore runtime error: " + err_txt, req_id);
				}
			}
		}
	}, 0);
	return req_id;
}

/**
 * Add new result to Leaderboard
 * @param cleaderboard_name
 * @param cscore The value of the result. It cannot be negative. If the table type is time, then the values must be transmitted in milliseconds.
 * @returns {Number} Request_id
 */
function YaGamesGML_Leaderboards_setScore(cleaderboard_name, cscore){
	return YaGamesGML_Leaderboards_setScore_extraData(cleaderboard_name, cscore);
}