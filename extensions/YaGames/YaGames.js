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

	stringifyObject: function (obj) {
		try {
			return JSON.stringify(obj);
		} catch (e) {
			return null;
		}
	},

	browserConsoleLog: function (message, request_id, data) {
		let self = YaGamesGMS;
		if (self._allowConsoleDebug) {
			if (data) {
				if (data instanceof Error) {
					message += " | " + self.toErrStr(data);
				}
				else {
					switch (typeof data) {
						case "undefined":
							// empty
							break;
						case "object":
							message += " | " + self.stringifyObject(data);
							break;
						default:
							message += " | " + data;
					}
				}
			}

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

	sendError: function (request_id, event, err) {
		setTimeout(() => {
			let self = YaGamesGMS;

			let map = {};
			if ("code" in err) map["code"] = err.code + "";
			if ("name" in err) map["name"] = err.name + "";
			if ("message" in err) {
				map["message"] = err.message + "";
			}
			else {
				map["message"] = self.toErrStr(err);
			}

			YaGamesGMS.send(request_id, event, map);
		}, 0);
	},

	sendSdkNotInitStatus: function (request_id) {
		let self = YaGamesGMS;
		self.browserConsoleLog( "notInitSDK", request_id, "SDK not Initialized");
		self.send(request_id, "notInitSDK", "SDK not Initialized");
	},

	sendLeaderboardNotInitStatus: function (request_id) {
		let self = YaGamesGMS;
		self.browserConsoleLog( "notLeaderboardInitSDK", request_id, "Leaderboard not Initialized");
		self.send(request_id, "notLeaderboardInitSDK", "Leaderboard not Initialized");
	},

	delaySend: function (request_id, event, message) {
		setTimeout(() => {
			YaGamesGMS.send(request_id, event, message);
		}, 0);
	},

	getInitStatus: function () {
		return YaGamesGMS._ysdk !== null;
	},

	getLeaderboardInitStatus: function () {
		return YaGamesGMS._lb !== null;
	}
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
	return (self._allowConsoleDebug ? 1 : 0);
}

/**
 * Get the SDK initialization status
 * @returns  1 0
 */
function YaGamesGMS_getInitStatus() {
	let self = YaGamesGMS;
	if (self.getInitStatus()) {
		self.browserConsoleLog("SDK is Initiated");
		return 1;
	}
	else {
		self.browserConsoleLog("SDK not Initiated");
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
 * Reloading the browser page
 */
function YaGamesGML_pageReload() {
	YaGamesGMS.browserConsoleLog( "Reloading the browser page");
	window.location.reload(true);
}

/**
 * Text output to browser console
 * @param {string} ctext
 */
function YaGamesGML_browserConsoleLog(ctext) {
	console.log(ctext + "");
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
			self.sendSdkNotInitStatus(req_id);
		}
		else {
			try {
				let text = ctext + "";
				self._ysdk.clipboard.writeText(text)
					.then(() => {
						self.browserConsoleLog( "Text copied to clipboard", req_id, text);
						self.send(req_id, "clipboardSuccess");
					})
					.catch((err) => {
						self.browserConsoleLog( "Failed FullScreen Ads show", req_id, err);
						self.sendError(req_id, "clipboardError", err)
					});
			} catch (err) {
				self.browserConsoleLog( "Runtime error", req_id, err);
				self.sendError(req_id, "RuntimeError", err)
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
			self.sendSdkNotInitStatus(req_id);
		}
		else {
			try {
				self._ysdk.adv.showFullscreenAdv({
					callbacks: {
						onClose: (wasShown) => {
							let map = {};
							map["wasShown"] = wasShown;
							self.browserConsoleLog( "FullScreen Ads closed", req_id, map);
							self.send(req_id, "adClosed", map);
						},
						onOpen: () => {
							self.browserConsoleLog( "FullScreen Ads opened", req_id);
							self.send(req_id, "adOpened");
						},
						onOffline: () => {
							self.browserConsoleLog( "FullScreen Ads. Offline mode", req_id);
							self.send(req_id, "offlineMode");
						},
						onError: (err) => {
							self.browserConsoleLog( "Failed FullScreen Ads show", req_id, err);
							self.sendError(req_id, "adError", err);
						},
					},
				});
			} catch (err) {
				self.browserConsoleLog( "Runtime error", req_id, err);
				self.sendError(req_id, "RuntimeError", err)
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
			self.sendSdkNotInitStatus(req_id);
		}
		else {
			try {
				self._ysdk.adv.showRewardedVideo({
					callbacks: {
						onOpen: () => {
							self.browserConsoleLog( "Reward ad opened.", req_id);
							self.send(req_id, "rewardOpened");
						},
						onRewarded: () => {
							self.browserConsoleLog( "Rewarded!", req_id);
							self.send(req_id, "rewardReceived");
						},
						onClose: () => {
							self.browserConsoleLog( "Reward ad closed.", req_id);
							self.send(req_id, "rewardClosed");
						},
						onError: (err) => {
							self.browserConsoleLog( "Reward ad show failed", req_id, err);
							self.sendError(req_id, "rewardError", err);
						},
					},
				});
			} catch (err) {
				self.browserConsoleLog( "Runtime error", req_id, err);
				self.sendError(req_id, "RuntimeError", err)
			}
		}
	}, 0);
	return req_id;
}

/**
 * Get the device type
 * @returns {Number} Request_id
 */
function YaGamesGML_DeviceInfo_getType() {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "Device type request", req_id);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
		}
		else {
			try {
				let dev_type = self._ysdk.deviceInfo.type;
				self.browserConsoleLog( "Device type", req_id, dev_type);
				self.send(req_id, "deviceType", dev_type);
			} catch (err) {
				self.browserConsoleLog( "Runtime error", req_id, err);
				self.sendError(req_id, "RuntimeError", err);
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
			self.sendSdkNotInitStatus(req_id);
		}
		else {
			try {
				let envDt = self._ysdk.environment;
				self.browserConsoleLog( "Environment", req_id, envDt);
				self.send(req_id, "environment", envDt);
			} catch (err) {
				self.browserConsoleLog( "Runtime error", req_id, err);
				self.sendError(req_id, "RuntimeError", err);
			}
		}
	}, 0);
	return req_id;
}

/**
 * Leaderboard object Initialization
 * @returns {Number} Request_id
 */
function YaGamesGML_Leaderboards_Init() {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "Leaderboard init requested", req_id);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
		}
		else {
			if (self.getLeaderboardInitStatus()) {
				self.browserConsoleLog( "Leaderboard was initialized", req_id);
				self.send(req_id, "leaderboardsInit");
			}
			else {
				try {
					self._ysdk.getLeaderboards()
						.then((lb) => {
							self._lb = lb;
							self.browserConsoleLog( "Leaderboard was initialized", req_id);
							self.send(req_id, "leaderboardsInit");
						})
						.catch((err) => {
							self.browserConsoleLog( "Leaderboards init error", req_id, err);
							self.sendError(req_id, "leaderboardsInitError", err);
						});
				} catch (err) {
					self.browserConsoleLog( "Runtime error", req_id, err);
					self.sendError(req_id, "RuntimeError", err)
				}
			}
		}
	}, 0);
	return req_id;
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
		self.browserConsoleLog( "Leaderboard requested", req_id, leaderboard_name);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
		}
		else {
			if (!self.getLeaderboardInitStatus()) {
				self.sendLeaderboardNotInitStatus(req_id);
			}
			else {
				try {
					self._lb.getLeaderboardDescription(leaderboard_name)
						.then((result) => {
							self.browserConsoleLog( "Leaderboards requested.", req_id, result);
							self.send(req_id, "leaderboardsRequest", result);
						})
						.catch((err) => {
							self.browserConsoleLog( "Leaderboard requested failed: ", req_id, err);
							self.sendError(req_id, "leaderboardsRequestError", err);
						});
				} catch (err) {
					self.browserConsoleLog( "Runtime error", req_id, err);
					self.sendError(req_id, "RuntimeError", err);
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
		self.browserConsoleLog( "Leaderboard PlayerEntry requested", req_id, leaderboard_name);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
		}
		else {
			if (!self.getLeaderboardInitStatus()) {
				self.sendLeaderboardNotInitStatus(req_id);
			}
			else {
				try {
					self._lb
						.getLeaderboardPlayerEntry(leaderboard_name)
						.then((result) => {
							if (cavatarSrcSize && result.player) {
								result.player.getAvatarSrc = result.player.getAvatarSrc(cavatarSrcSize + "");
							}
							if (cavatarSrcSetSize && result.player) {
								result.player.getAvatarSrcSet = result.player.getAvatarSrcSet(cavatarSrcSetSize + "");
							}
							self.browserConsoleLog("Leaderboards PlayerEntry loaded: " + result, req_id, result);
							self.send(req_id, "leaderboardsPlayerEntry", result);
						})
						.catch((err) => {
							self.browserConsoleLog("Leaderboards PlayerEntry failed", req_id, err);
							if (err.code === 'LEADERBOARD_PLAYER_NOT_PRESENT') {
								self.sendError(req_id, "leaderboardsPlayerNotPresent", err);
							} else {
								self.sendError(req_id, "leaderboardsPlayerEntryError", err);
							}
						});
				} catch (err) {
					self.browserConsoleLog("Leaderboard PlayerEntry runtime error", req_id, err);
					self.sendError(req_id, "RuntimeError", err);
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
function YaGamesGML_Leaderboards_getEntries(
	cleaderboard_name,
	cavatarSrcSize,
	cavatarSrcSetSize,
	cincludeUser,
	cquantityAround,
	cquantityTop
){
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		let leaderboard_name = cleaderboard_name + "";
		self.browserConsoleLog( "Leaderboard Entries requested", req_id, leaderboard_name);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
		}
		else {
			if (!self.getLeaderboardInitStatus()) {
				self.sendLeaderboardNotInitStatus(req_id);
			}
			else {
				try {
					let options = {};
					if (cincludeUser) options.includeUser = cincludeUser > 0;
					if (cquantityAround) options.quantityAround = (cquantityAround < 1) ? 1 : ((cquantityAround > 10) ? 10 : cquantityAround);
					if (cquantityTop) options.quantityTop = (cquantityTop < 1) ? 1 : ((cquantityTop > 20) ? 20 : cquantityTop);

					self._lb
						.getLeaderboardEntries(leaderboard_name, options)
						.then((result) => {
							if (result.entries) {
								for (let i = 0; i < result.entries.length; i++) {
									let entry = result.entries[i];
									if (cavatarSrcSize) {
										entry.player.getAvatarSrc = entry.player.getAvatarSrc(cavatarSrcSize + "");
									}
									if (cavatarSrcSetSize) {
										entry.player.getAvatarSrcSet = entry.player.getAvatarSrcSet(cavatarSrcSetSize + "");
									}
								}
							}
							self.browserConsoleLog("Leaderboards Entries loaded", req_id, result);
							self.send(req_id, "leaderboardsEntries", result);
						})
						.catch((err) => {
							self.browserConsoleLog("Leaderboards Entries failed", req_id, err);
							self.sendError(req_id, "leaderboardsEntriesError", err);
						});
				} catch (err) {
					self.browserConsoleLog("Leaderboard Entries runtime error", req_id, err);
					self.sendError(req_id, "RuntimeError", err);
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
 * @param cextra_data User description.
 * @returns {Number} Request_id
 */
function YaGamesGML_Leaderboards_setScore(cleaderboard_name, cscore, cextra_data) {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		let leaderboard_name = cleaderboard_name + "";
		self.browserConsoleLog( "Leaderboard SetScore requested", req_id, leaderboard_name);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
		}
		else {
			if (!self.getLeaderboardInitStatus()) {
				self.sendLeaderboardNotInitStatus(req_id);
			}
			else {
				try {
					let promise;
					let score = +cscore;
					if (cextra_data) {
						promise = self._lb.setLeaderboardScore(leaderboard_name, score, cextra_data + "");
					} else {
						promise = self._lb.setLeaderboardScore(leaderboard_name, score);
					}
					promise
						.then((result) => {
							self.browserConsoleLog( "Leaderboards SetScore success.", req_id, result);
							self.send(req_id, "leaderboardsSetScore", result);
						})
						.catch((err) => {
							self.browserConsoleLog( "Leaderboard SetScore failed", req_id, err);
							self.sendError(req_id, "leaderboardsSetScoreError", err);
						});
				} catch (err) {
					self.browserConsoleLog( "Leaderboard SetScore runtime error", req_id, err);
					self.sendError(req_id, "RuntimeError", err);
				}
			}
		}
	}, 0);
	return req_id;
}