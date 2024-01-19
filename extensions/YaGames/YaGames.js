// Async Yandex Games SDK 2 
(function(d) {
	console.log('Yandex SDK start load script');
	let t = d.getElementsByTagName('script')[0];
	let s = d.createElement('script');
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
	_player: null,
	_payments: null,

	parseJson: function (json) {
		try {
			return JSON.parse(json);
		} catch (e) {
			return null;
		}
	},

	/**
	 We output the text to the browser console
	 @param message The text of the message
	 @param request_id {number} Request ID
	 @param data Event data
	 */
	browserConsoleLog: function (message, request_id= -1, data = null) {
		if (YaGamesGMS._allowConsoleDebug) {
			if (data) {
				if (data instanceof Error) {
					message += " | " + data.toString();
				}
				else {
					message += " | " + JSON.stringify(data);
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

	/**
	 * Getting a new ID for the request
	 * @returns {number}
	 */
	newRequest: function () {
		return ++YaGamesGMS._request_id;
	},

	/**
	 * Send data to Game Maker to the Async - Social event
	 * @param request_id {number} Request ID
	 * @param event {string} Event code
	 * @param data Event data
	 */
	send: function (request_id, event, data = null) {
		let self = YaGamesGMS;

		let map = {};
		map["type"] = self._mapTypeDesc;
		map["request_id"] = +request_id;
		if (isNaN(map["request_id"])) map["request_id"] = -1;
		map["event"] = (event + "").trim();

		if (data != null) {
			switch (typeof data) {
				case "number":
					map["value"] = Number(data);
					break;
				case "string":
					map["value"] = String(data);
					break;
				case "boolean":
					map["value"] = Number(data ? 1 : 0);
					break;
				default:
					map["data"] = JSON.stringify(data);
			}
		}

		GMS_API.send_async_event_social(map);

	},

	/**
	 * Send error data to Game Maker to the Async - Social event
	 * @param request_id {number} Request ID
	 * @param event {string} Event code
	 * @param err_data
	 */
	sendError: function (request_id, event, err_data) {
		setTimeout(() => {
			let self = YaGamesGMS;

			let map = {};
			map["type"] = self._mapTypeDesc + "";
			map["request_id"] = +request_id;
			if (isNaN(map["request_id"])) map["request_id"] = -1;
			map["event"] = (event + "").trim();

			if ("code" in err_data) map["code"] = String(err_data.code);
			if ("name" in err_data) map["name"] = err_data.name;
			if ("message" in err_data) {
				map["message"] = err_data.message;
			}
			else {
				map["message"] = JSON.stringify(err_data);
			}

			GMS_API.send_async_event_social(map);
		}, 0);
	},

	/**
	 * Async send data to Game Maker to the Async - Social event
	 * @param request_id {number} Request ID
	 * @param event {string} Event code
	 * @param data Event data
	 */
	delaySend: function (request_id, event, data) {
		setTimeout(() => {
			YaGamesGMS.send(request_id, event, data);
		}, 0);
	},

	/**
	 * @param request_id {number} Request ID
	 */
	sendSdkNotInitStatus: function (request_id) {
		let self = YaGamesGMS;
		self.browserConsoleLog( "notInitSDK", request_id, "SDK not Initialized");
		self.send(request_id, "notInitSDK", "SDK not Initialized");
	},
	/**
	 * @param request_id {number} Request ID
	 */
	sendLeaderboardNotInitStatus: function (request_id) {
		let self = YaGamesGMS;
		self.browserConsoleLog( "notLeaderboardInitSDK", request_id, "Leaderboard not Initialized");
		self.send(request_id, "notLeaderboardInitSDK", "Leaderboard not Initialized");
	},
	/**
	 * @param request_id {number} Request ID
	 */
	sendPlayerNotInitStatus: function (request_id) {
		let self = YaGamesGMS;
		self.browserConsoleLog( "notPlayerInitSDK", request_id, "Player not Initialized");
		self.send(request_id, "notPlayerInitSDK", "Player not Initialized");
	},
	/**
	 * @param request_id {number} Request ID
	 */
	sendPaymentsNotInitStatus: function (request_id) {
		let self = YaGamesGMS;
		self.browserConsoleLog( "notPaymentsInitSDK", request_id, "Payments not Initialized");
		self.send(request_id, "notPaymentsInitSDK", "Payments not Initialized");
	},
	/**
	 * @returns {boolean}
	 */
	getInitStatus: function () {
		return YaGamesGMS._ysdk !== null;
	},
	/**
	 * @returns {boolean}
	 */
	getLeaderboardInitStatus: function () {
		return YaGamesGMS._lb !== null;
	},
	/**
	 * @returns {boolean}
	 */
	getPlayerInitStatus: function () {
		return YaGamesGMS._player !== null;
	},
	/**
	 * @returns {boolean}
	 */
	getPaymentsInitStatus: function () {
		return YaGamesGMS._payments !== null;
	},
}

/***
 * Vibration of the mobile device for N milliseconds
 * @param {Number} ms
 */
function YaGamesGML_MobileVibro(ms = 200) {
	window.navigator.vibrate(Number(ms));
}

/**
 * Script is loaded. Initialization SDK.
 */
function YaGamesGMS_SdkInit() {
	let self = YaGamesGMS;
	YaGames.init().then(ysdk => {
		console.log('Yandex SDK initialized');
		self._ysdk = ysdk;
		// We show the SDK that the game has loaded and you can start playing.
		if (YaGames_send_game_start)
		{
			self._ysdk.features.LoadingAPI?.ready();
		}
	});
}

/**
 * Allow log output to the browser console
 * @param debugStatus {Number} Enable (1) / Disable (0)
 * @returns {Number} Enabled (1) / Disabled (0)
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
 * Checking the SDK availability
 * @returns {number} Initiated (1) / Not Initiated (0)
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
 * @returns {string}
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
	window.location.reload();
}

/**
 * Text output to browser console
 * @param {string} text
 */
function YaGamesGML_browserConsoleLog(text) {
	console.log(text);
}

/**
 * Sending a message that the game is ready
 * @returns {number} Request ID
 */
function YaGamesGMS_GameReadyOn() {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "GameReady request", req_id);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
			return;
		}
		try {
			self.browserConsoleLog( "Yandex SDK GameReady", req_id);
			self._ysdk.features.LoadingAPI?.ready();
			self.send(req_id, "gameReady");
		} catch (err) {
			self.browserConsoleLog( "Runtime error", req_id, err);
			self.sendError(req_id, "RuntimeError", err)
		}
	}, 0);
	return req_id;
}

/**
 * Request to show fullscreen ads
 * @returns {Number} Request ID
 */
function YaGamesGMS_showFullscreenAdv() {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "FullScreen Ads requested", req_id);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
			return;
		}
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
	}, 0);
	return req_id;
}

/**
 * Request to show rewarded video ads
 * @returns {Number} Request ID
 */
function YaGamesGMS_showRewardedVideo() {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "FullScreen ad requested", req_id);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
			return;
		}
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
	}, 0);
	return req_id;
}

/**
 * Get the banner status
 * @returns {Number} Request ID
 */
 function YaGamesGML_Banner_getAdvStatus() {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "Banner status request", req_id);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
			return;
		}
		try {
			self._ysdk.adv.getBannerAdvStatus()
			.then(({ result }) => {
				if (result) {
					self.browserConsoleLog( "Banner is showing.", req_id);
					self.send(req_id, "bannerShowing");
				} else {
					self.browserConsoleLog( "Banner is hidden.", req_id);
					self.send(req_id, "bannerHidden");
				}
			})
			.catch((err) => {
				self.browserConsoleLog( "Get Banner status error", req_id, err);
				self.sendError(req_id, "getBannerStatusError", err);
			});

		} catch (err) {
			self.browserConsoleLog( "Runtime error", req_id, err);
			self.sendError(req_id, "RuntimeError", err)
		}
	}, 0);
	return req_id;
}

/**
 * Show sticky banner
 * @returns {Number} Request ID
 */
function YaGamesGML_Banner_ShowAdv() {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "Banner show request", req_id);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
			return;
		}
		try {
			self._ysdk.adv.showBannerAdv()
			.then(({ result , reason }) => {
				if (result) {
					self.browserConsoleLog( "Banner shown.", req_id);
					self.send(req_id, "bannerShown");
				} else {
					self.browserConsoleLog( "Banner not shown.", req_id, reason);
					self.send(req_id, "bannerNotShown", reason);
				}
			})
			.catch((err) => {
				self.browserConsoleLog( "Banner show error", req_id, err);
				self.sendError(req_id, "bannerShowError", err);
			});

		} catch (err) {
			self.browserConsoleLog( "Runtime error", req_id, err);
			self.sendError(req_id, "RuntimeError", err)
		}
	}, 0);
	return req_id;
}

/**
 * Hide sticky banner
 * @returns {Number} Request ID
 */
function YaGamesGML_Banner_HideAdv() {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "Banner hide request", req_id);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
			return;
		}
		try {
			self._ysdk.adv.hideBannerAdv()
			.then((result) => {
				self.browserConsoleLog( "Banner hidden", req_id, result);
				self.send(req_id, "bannerHidden", result);
			})
			.catch((err) => {
				self.browserConsoleLog( "Banner hide error", req_id, err);
				self.sendError(req_id, "bannerHideError", err);
			});

		} catch (err) {
			self.browserConsoleLog( "Runtime error", req_id, err);
			self.sendError(req_id, "RuntimeError", err)
		}
	}, 0);
	return req_id;
}

/**
 * Copying the text to the clipboard
 * @param {string} text
 * @returns {Number} Request ID
 */
function YaGamesGML_setToClipboard(text) {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "Clipboard request", req_id);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
			return;
		}
		try {
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
	}, 0);
	return req_id;
}

/**
 * Get the device type
 * @returns {Number} Request ID
 */
function YaGamesGML_DeviceInfo_getType() {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "Device type request", req_id);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
			return;
		}
		try {
			let dev_type = self._ysdk.deviceInfo.type;
			self.browserConsoleLog( "Device type", req_id, dev_type);
			self.send(req_id, "deviceType", dev_type);
		} catch (err) {
			self.browserConsoleLog( "Runtime error", req_id, err);
			self.sendError(req_id, "RuntimeError", err);
		}
	}, 0);
	return req_id;
}

/**
 * Yandex.Game Environment
 * @returns {Number} Request ID
 */
function YaGamesGML_getEnvironment() {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "Environment request", req_id);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
			return;
		}
		try {
			let envDt = self._ysdk.environment;
			self.browserConsoleLog( "Environment", req_id, envDt);
			self.send(req_id, "environment", envDt);
		} catch (err) {
			self.browserConsoleLog( "Runtime error", req_id, err);
			self.sendError(req_id, "RuntimeError", err);
		}
	}, 0);
	return req_id;
}

/**
 * Leaderboard object Initialization
 * @returns {Number} Request ID
 */
function YaGamesGML_Leaderboards_Init() {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "Leaderboard init requested", req_id);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
			return;
		}
		if (self.getLeaderboardInitStatus()) {
			self.browserConsoleLog( "Leaderboard was initialized", req_id);
			self.send(req_id, "leaderboardsInit");
			return;
		}
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
	}, 0);
	return req_id;
}

/**
 * Get a description of the Leaderboard
 * @param leaderboard_name {string} Technical name of the leaderboard
 * @returns {Number} Request ID
 */
function YaGamesGML_Leaderboards_getByDescription(leaderboard_name) {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "Leaderboard requested", req_id, leaderboard_name);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
			return;
		}
		if (!self.getLeaderboardInitStatus()) {
			self.sendLeaderboardNotInitStatus(req_id);
			return;
		}
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
	}, 0);
	return req_id;
}

/**
 * User rating in the Leaderboards
 * @param leaderboard_name {string} Technical name of the leaderboard
 * @param avatarSrcSize {string} User portrait URL. Possible size values are small, medium, and large.
 * @param avatarSrcSetSize {string} Srcset of a user portrait that is suitable for Retina displays. Possible values for size: small, medium and large
 * @returns {Number} Request ID
 */
function YaGamesGML_Leaderboards_getPlayerEntry(
	leaderboard_name,
	avatarSrcSize,
	avatarSrcSetSize
){
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "Leaderboard PlayerEntry requested", req_id, leaderboard_name);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
			return;
		}
		if (!self.getLeaderboardInitStatus()) {
			self.sendLeaderboardNotInitStatus(req_id);
			return;
		}
		try {
			self._lb.getLeaderboardPlayerEntry(leaderboard_name)
				.then((result) => {
					if (avatarSrcSize && result.player) {
						result.player.getAvatarSrc = result.player.getAvatarSrc(avatarSrcSize);
					}
					if (avatarSrcSetSize && result.player) {
						result.player.getAvatarSrcSet = result.player.getAvatarSrcSet(avatarSrcSetSize);
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
	}, 0);
	return req_id;
}

/**
 * Get the rating of multiple users
 * @param leaderboard_name {string} Technical name of the leaderboard
 * @param avatarSrcSize {string} User portrait URL. Possible size values are small, medium, and large.
 * @param avatarSrcSetSize {string} Srcset of a user portrait that is suitable for Retina displays. Possible values for size: small, medium and large
 * @param includeUser {?number}
 * @param quantityAround {?number}
 * @param quantityTop {?number}
 * @returns {Number} Request ID
 */
function YaGamesGML_Leaderboards_getEntries(
	leaderboard_name,
	avatarSrcSize,
	avatarSrcSetSize,
	includeUser,
	quantityAround,
	quantityTop
){
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "Leaderboard Entries requested", req_id, leaderboard_name);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
			return;
		}
		if (!self.getLeaderboardInitStatus()) {
			self.sendLeaderboardNotInitStatus(req_id);
			return;
		}
		try {
			let options = {};
			if (includeUser) options.includeUser = includeUser > 0;
			if (quantityAround) options.quantityAround = (quantityAround < 1) ? 1 : ((quantityAround > 10) ? 10 : quantityAround);
			if (quantityTop) options.quantityTop = (quantityTop < 1) ? 1 : ((quantityTop > 20) ? 20 : quantityTop);

			self._lb.getLeaderboardEntries(leaderboard_name, options)
				.then((result) => {
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
	}, 0);
	return req_id;
}

/**
 * Add new result to Leaderboard
 * @param leaderboard_name {string} Technical name of the leaderboard
 * @param score {number} The value of the result. It cannot be negative. If the table type is time, then the values must be transmitted in milliseconds.
 * @param extra_data {?string} User description.
 * @returns {Number} Request ID
 */
function YaGamesGML_Leaderboards_setScore(leaderboard_name, score, extra_data) {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "Leaderboard SetScore requested", req_id, leaderboard_name);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
			return;
		}
		if (!self.getLeaderboardInitStatus()) {
			self.sendLeaderboardNotInitStatus(req_id);
			return;
		}
		try {
			let _e = extra_data ? extra_data : undefined;
			self._lb.setLeaderboardScore(leaderboard_name, score, _e)
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
	}, 0);
	return req_id;
}

/**
 * Player object Initialization
 * @param scopes Include name and avatar. The user will see a dialog box asking for access. If the user refuses to grant access, you will only receive their ID.
 * @returns {Number} Request ID
 */
function YaGamesGML_Player_Init(scopes = 0) {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "Player init requested", req_id);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
			return;
		}
		if (self.getPlayerInitStatus()) {
			self.browserConsoleLog( "Player was initialized", req_id);
			self.send(req_id, "playerInit");
			return;
		}
		try {
			self._ysdk.getPlayer((scopes > 0))
				.then((player) => {
					self._player = player;
					self.browserConsoleLog( "Player was initialized", req_id);
					self.send(req_id, "playerInit");
				})
				.catch((err) => {
					self.browserConsoleLog( "Player init error", req_id, err);
					self.sendError(req_id, "playerInitError", err);
				});
		} catch (err) {
			self.browserConsoleLog( "Runtime error", req_id, err);
			self.sendError(req_id, "RuntimeError", err);
		}
	}, 0);
	return req_id;
}

/**
 * Get a permanent unique user ID
 * @returns {Number} Request ID
 */
function YaGamesGML_Player_GetUniqueID() {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "Player ID requested", req_id);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
			return;
		}
		if (!self.getPlayerInitStatus()) {
			self.sendPlayerNotInitStatus(req_id);
			return;
		}
		try {
			let cid = self._player.getUniqueID();
			self.browserConsoleLog( "Player ID requested", req_id, cid);
			self.send(req_id, "playerIdRequest", cid);
		} catch (err) {
			self.browserConsoleLog( "Runtime error", req_id, err);
			self.sendError(req_id, "RuntimeError", err);
		}
	}, 0);
	return req_id;
}

/**
 * Get user IDs across all developer games.
 * @returns {Number} Request ID
 */
function YaGamesGML_Player_GetIDsPerGame() {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "Player IDs Per Game requested", req_id);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
			return;
		}
		if (!self.getPlayerInitStatus()) {
			self.sendPlayerNotInitStatus(req_id);
			return;
		}
		try {
			self._player.getIDsPerGame()
				.then((arr) => {
					self.browserConsoleLog( "Player IDs Per Game requested", req_id, arr);
					self.send(req_id, "playerIDsPerGame", arr);
				})
				.catch((err) => {
					self.browserConsoleLog( "Player IDs Per Game requested error", req_id, err);
					self.sendError(req_id, "playerIDsPerGameError", err);
				});
		} catch (err) {
			self.browserConsoleLog( "Runtime error", req_id, err);
			self.sendError(req_id, "RuntimeError", err);
		}
	}, 0);
	return req_id;
}

/**
 * Get user photo
 * @param avatarSize {string} Photo size. Possible size values are small, medium, and large.
 * @returns {Number} Request ID
 */
function YaGamesGML_Player_GetPhoto(avatarSize) {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "Player Photo requested", req_id);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
			return;
		}
		if (!self.getPlayerInitStatus()) {
			self.sendPlayerNotInitStatus(req_id);
			return;
		}
		try {
			let cname = self._player.getPhoto(avatarSize);
			self.browserConsoleLog( "Player Photo requested", req_id, cname);
			self.send(req_id, "playerPhotoRequest", cname);
		} catch (err) {
			self.browserConsoleLog( "Runtime error", req_id, err);
			self.sendError(req_id, "RuntimeError", err);
		}
	}, 0);
	return req_id;
}

/**
 * Save user data
 * @param cdata {String} Object containing key-value pairs.
 * @param flush {Number} Sequence of sending data
 * @returns {Number} Request ID
 */
function YaGamesGML_Player_SetData(cdata, flush = 0) {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "Player Set Data requested", req_id);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
			return;
		}
		if (!self.getPlayerInitStatus()) {
			self.sendPlayerNotInitStatus(req_id);
			return;
		}
		try {
			let data = self.parseJson(cdata);
			self._player.setData(data, (flush > 0))
				.then(() => {
					self.browserConsoleLog( "Player Set Data requested", req_id);
					self.send(req_id, "playerSetData");
				})
				.catch((err) => {
					self.browserConsoleLog( "Player Set Data requested error", req_id, err);
					self.sendError(req_id, "playerSetDataError", err);
				});
		} catch (err) {
			self.browserConsoleLog( "Runtime error", req_id, err);
			self.sendError(req_id, "RuntimeError", err);
		}
	}, 0);
	return req_id;
}

/**
 * Get user data
 * @param keys {?string} List of keys to return.
 * @returns {Number} Request ID
 */
function YaGamesGML_Player_GetData(keys = null) {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "Player Get Data requested", req_id);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
			return;
		}
		if (!self.getPlayerInitStatus()) {
			self.sendPlayerNotInitStatus(req_id);
			return;
		}
		try {
			let _k = (keys) ? self.parseJson(keys) : undefined;
			self._player.getData(_k)
				.then((result) => {
					self.browserConsoleLog( "Player Get Data requested", req_id, result);
					self.send(req_id, "playerGetData", result);
				})
				.catch((err) => {
					self.browserConsoleLog( "Player Get Data requested error", req_id, err);
					self.sendError(req_id, "playerGetDataError", err);
				});
		} catch (err) {
			self.browserConsoleLog( "Runtime error", req_id, err);
			self.sendError(req_id, "RuntimeError", err);
		}
	}, 0);
	return req_id;
}

/**
 * Stores numerical user data
 * @param cstats {string} An object containing key-value pairs, where each value must be a number.
 * @returns {Number} Request ID
 */
function YaGamesGML_Player_SetStats(cstats) {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "Player Set Stats requested", req_id);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
			return;
		}
		if (!self.getPlayerInitStatus()) {
			self.sendPlayerNotInitStatus(req_id);
			return;
		}
		try {
			let stats = self.parseJson(cstats);
			self._player.setStats(stats)
				.then(() => {
					self.browserConsoleLog( "Player Set Stats requested", req_id);
					self.send(req_id, "playerSetStats");
				})
				.catch((err) => {
					self.browserConsoleLog( "Player Set Stats requested error", req_id, err);
					self.sendError(req_id, "playerSetStatsError", err);
				});
		} catch (err) {
			self.browserConsoleLog( "Runtime error", req_id, err);
			self.sendError(req_id, "RuntimeError", err);
		}
	}, 0);
	return req_id;
}

/**
 * Get the numerical data for the user.
 * @param keys {?string} List of keys to return.
 * @returns {Number} Request ID
 */
function YaGamesGML_Player_GetStats(keys = null) {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "Player Get Stats requested", req_id);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
			return;
		}
		if (!self.getPlayerInitStatus()) {
			self.sendPlayerNotInitStatus(req_id);
			return;
		}
		try {
			let _k = (keys) ? self.parseJson(keys) : undefined;
			self._player.getStats(_k)
				.then((result) => {
					self.browserConsoleLog( "Player Get Stats requested", req_id, result);
					self.send(req_id, "playerGetStats", result);
				})
				.catch((err) => {
					self.browserConsoleLog( "Player Get Stats requested error", req_id, err);
					self.sendError(req_id, "playerGetStatsError", err);
				});
		} catch (err) {
			self.browserConsoleLog( "Runtime error", req_id, err);
			self.sendError(req_id, "RuntimeError", err);
		}
	}, 0);
	return req_id;
}

/**
 * Modifies the user's in-game data.
 * @param increments {string} An object that contains key-value pairs, where each value must be a number.
 * @returns {Number} Request ID
 */
function YaGamesGML_Player_IncrementStats(increments) {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "Player Increment Stats requested", req_id);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
			return;
		}
		if (!self.getPlayerInitStatus()) {
			self.sendPlayerNotInitStatus(req_id);
			return;
		}
		try {
			let _i = self.parseJson(increments);
			self._player.incrementStats(_i)
				.then((result) => {
					self.browserConsoleLog( "Player Increment Stats requested", req_id, result);
					self.send(req_id, "playerIncrementStats", result);
				})
				.catch((err) => {
					self.browserConsoleLog( "Player Increment Stats requested error", req_id, err);
					self.sendError(req_id, "playerIncrementStatsError", err);
				});
		} catch (err) {
			self.browserConsoleLog( "Runtime error", req_id, err);
			self.sendError(req_id, "RuntimeError", err);
		}
	}, 0);
	return req_id;
}

/**
 * Player Get Mode
 * @returns {Number} Request ID
 */
function YaGamesGML_Player_GetMode() {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "Player GetMode requested", req_id);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
			return;
		}
		if (!self.getPlayerInitStatus()) {
			self.sendPlayerNotInitStatus(req_id);
			return;
		}
		try {
			let cid = self._player.getMode();
			self.browserConsoleLog( "Player GetMode requested", req_id, cid);
			self.send(req_id, "playerGetModeRequest", cid);
		} catch (err) {
			self.browserConsoleLog( "Runtime error", req_id, err);
			self.sendError(req_id, "RuntimeError", err);
		}
	}, 0);
	return req_id;
}

/**
 * Player authorization request
 * @returns {Number} Request ID
 */
function YaGamesGML_OpenAuthDialog() {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "Player authorization request", req_id);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
			return;
		}
		if (!self.getPlayerInitStatus()) {
			self.sendPlayerNotInitStatus(req_id);
			return;
		}
		try {
			if (self._player.getMode() === 'lite') {
				self._ysdk.auth.openAuthDialog()
					.then(() => {
						self.browserConsoleLog( "The player has successfully logged in", req_id);
						self.send(req_id, "playerLogged");
					})
					.catch((err) => {
						self.browserConsoleLog( "The player is not logged in", req_id, err);
						self.sendError(req_id, "playerLoggedError", err);
					});
			}
			else {
				self.browserConsoleLog( "The player is already logged in", req_id);
				self.send(req_id, "playerAlreadyLogged");
			}
		} catch (err) {
			self.browserConsoleLog( "Runtime error", req_id, err);
			self.sendError(req_id, "RuntimeError", err);
		}
	}, 0);
	return req_id;
}

/**
 * Get fullscreen status
 * @returns {Number} Request ID
 */
function YaGamesGMS_Screen_Fullscreen_Status() {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "FullScreen status requested", req_id);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
			return;
		}
		try {
			let status = self._ysdk.screen.fullscreen.status;
			self.browserConsoleLog( "FullScreen status received", req_id, status);
			self.send(req_id, "fullscreenStatus", status);
		} catch (err) {
			self.browserConsoleLog( "Runtime error", req_id, err);
			self.sendError(req_id, "RuntimeError", err)
		}
	}, 0);
	return req_id;
}

/**
 * Switch to fullscreen mode
 * @returns {Number} Request ID
 */
function YaGamesGMS_Screen_Fullscreen_Request() {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "FullScreen mode requested", req_id);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
			return;
		}
		try {
			self._ysdk.screen.fullscreen.request()
				.then(() => {
					self.browserConsoleLog( "Full screen transition successful", req_id);
					self.send(req_id, "fullscreenOpened");
				})
				.catch((err) => {
					self.browserConsoleLog( "Switch to fullscreen mode failed", req_id, err);
					self.sendError(req_id, "fullscreenOpenError", err);
				});
		} catch (err) {
			self.browserConsoleLog( "Runtime error", req_id, err);
			self.sendError(req_id, "RuntimeError", err)
		}
	}, 0);
	return req_id;
}

/**
 * Exit fullscreen mode
 * @returns {Number} Request ID
 */
function YaGamesGMS_Screen_Fullscreen_Exit() {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "FullScreen Exit requested", req_id);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
			return;
		}
		try {
			self._ysdk.screen.fullscreen.exit()
				.then(() => {
					self.browserConsoleLog( "Successful exit from fullscreen mode", req_id);
					self.send(req_id, "fullscreenExited");
				})
				.catch((err) => {
					self.browserConsoleLog( "Fullscreen exit error", req_id, err);
					self.sendError(req_id, "fullscreenExitError", err);
				});
		} catch (err) {
			self.browserConsoleLog( "Runtime error", req_id, err);
			self.sendError(req_id, "RuntimeError", err)
		}
	}, 0);
	return req_id;
}

/**
 * Checking the ability to request an estimate
 * @returns {Number} Request ID
 */
function YaGamesGMS_Feedback_CanReview() {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "Сan Review requested", req_id);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
			return;
		}
		try {
			self._ysdk.feedback.canReview()
				.then((result) => {
					self.browserConsoleLog( "Request Can Review success", req_id, result);
					self.send(req_id, "canReview", result);
				})
				.catch((err) => {
					self.browserConsoleLog( "Request Can Review error", req_id, err);
					self.sendError(req_id, "canReviewError", err);
				});
		} catch (err) {
			self.browserConsoleLog( "Runtime error", req_id, err);
			self.sendError(req_id, "RuntimeError", err);
		}
	}, 0);
	return req_id;
}

/**
 * Invite the user to rate the game
 * @returns {Number} Request ID
 */
function YaGamesGMS_Feedback_RequestReview() {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "Request Review requested", req_id);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
			return;
		}
		try {
			self._ysdk.feedback.requestReview()
				.then((result) => {
					self.browserConsoleLog( "Successful request Review", req_id, result);
					self.send(req_id, "requestReview", result);
				})
				.catch((err) => {
					self.browserConsoleLog( "Request Review error", req_id, err);
					self.sendError(req_id, "requestReviewError", err);
				});
		} catch (err) {
			self.browserConsoleLog( "Runtime error", req_id, err);
			self.sendError(req_id, "RuntimeError", err)
		}
	}, 0);
	return req_id;
}

/**
 * Checking the ability to add a shortcut to the game
 * @returns {Number} Request ID
 */
function YaGamesGMS_Shortcut_CanShowPrompt() {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "Can Shortcut requested", req_id);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
			return;
		}
		try {
			self._ysdk.shortcut.canShowPrompt()
				.then((result) => {
					self.browserConsoleLog( "Request Can Shortcut success", req_id, result);
					self.send(req_id, "canShortcut", result);
				})
				.catch((err) => {
					self.browserConsoleLog( "Request Can Shortcut error", req_id, err);
					self.sendError(req_id, "canShortcutError", err);
				});
		} catch (err) {
			self.browserConsoleLog( "Runtime error", req_id, err);
			self.sendError(req_id, "RuntimeError", err)
		}
	}, 0);
	return req_id;
}

/**
 * Request to add a shortcut to the game
 * @returns {Number} Request ID
 */
function YaGamesGMS_Shortcut_ShowPrompt() {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "Shortcut create requested", req_id);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
			return;
		}
		try {
			self._ysdk.shortcut.showPrompt()
				.then((result) => {
					self.browserConsoleLog( "Successful created Shortcut", req_id, result);
					self.send(req_id, "shortcutCreated", result);
				})
				.catch((err) => {
					self.browserConsoleLog( "Shortcut create error", req_id, err);
					self.sendError(req_id, "shortcutCreateError", err);
				});
		} catch (err) {
			self.browserConsoleLog( "Runtime error", req_id, err);
			self.sendError(req_id, "RuntimeError", err)
		}
	}, 0);
	return req_id;
}

/**
 * Payments object Initialization
 * @param signed {?number} Add a signature to confirm the purchase.
 * @returns {Number} Request ID
 */
 function YaGamesGML_Payments_Init(signed = 1) {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "Payments init requested", req_id);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
			return;
		}
		if (self.getPaymentsInitStatus()) {
			self.browserConsoleLog( "Payments was initialized", req_id);
			self.send(req_id, "paymentsInit");
			return;
		}
		try {
			let options = { signed: true };
			if (signed <= 0) {
				options = { signed: false };
			}
			self._ysdk.getPayments(options)
				.then((payments) => {
					self._payments = payments;
					self.browserConsoleLog( "Payments was initialized", req_id);
					self.send(req_id, "paymentsInit");
				})
				.catch((err) => {
					self.browserConsoleLog( "Payments init error", req_id, err);
					self.sendError(req_id, "paymentsInitError", err);
				});
		} catch (err) {
			self.browserConsoleLog( "Runtime error", req_id, err);
			self.sendError(req_id, "RuntimeError", err)
		}
	}, 0);
	return req_id;
}

/**
 * Payments object Initialization
 * @param cid {string} Product ID.
 * @param developerPayload {?string} Additional information about the purchase that you want to transfer to your server.
 * @returns {Number} Request ID
 */
function YaGamesGMS_Payments_Purchase(cid, developerPayload= null) {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "Purchase request", req_id);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
			return;
		}
		if (!self.getPaymentsInitStatus()) {
			self.sendPaymentsNotInitStatus(req_id);
			return;
		}
		try {
			let options = { id: cid };
			if (developerPayload) {
				options = { 
					id: cid,
					developerPayload: developerPayload
				};
			}
			self._payments.purchase(options)
				.then((p) => {
					self.browserConsoleLog( "Purchase requested", req_id, p);
					self.send(req_id, "purchaseRequested", p);
				})
				.catch((err) => {
					self.browserConsoleLog( "Purchase request error", req_id, err);
					self.sendError(req_id, "purchaseRequestError", err);
				});

		} catch (err) {
			self.browserConsoleLog( "Runtime error", req_id, err);
			self.sendError(req_id, "RuntimeError", err);
		}
	}, 0);
	return req_id;
}

/**
 * Get a purchases list
 * @returns {Number} Request ID
 */
function YaGamesGMS_Payments_GetPurchases() {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "Get all purchases", req_id);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
			return;
		}
		if (!self.getPaymentsInitStatus()) {
			self.sendPaymentsNotInitStatus(req_id);
			return;
		}
		try {
			self._payments.getPurchases()
				.then((purchases) => {
					self.browserConsoleLog( "Get Purchases requested", req_id, purchases);
					self.send(req_id, "getPurchases", purchases);
				})
				.catch((err) => {
					self.browserConsoleLog( "Get Purchases error", req_id, err);
					self.sendError(req_id, "getPurchasesError", err);
				});

		} catch (err) {
			self.browserConsoleLog( "Runtime error", req_id, err);
			self.sendError(req_id, "RuntimeError", err);
		}
	}, 0);
	return req_id;
}

/**
 * Getting a catalog of all products
 * @returns {Number} Request ID
 */
function YaGamesGMS_Payments_GetCatalog() {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "Get the product catalog", req_id);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
			return;
		}
		if (!self.getPaymentsInitStatus()) {
			self.sendPaymentsNotInitStatus(req_id);
			return;
		}
		try {
			self._payments.getCatalog()
				.then((products) => {
					self.browserConsoleLog( "Get Catalog", req_id, products);
					self.send(req_id, "getCatalog", products);
				})
				.catch((err) => {
					self.browserConsoleLog( "Get Catalog error", req_id, err);
					self.sendError(req_id, "getCatalogError", err);
				});

		} catch (err) {
			self.browserConsoleLog( "Runtime error", req_id, err);
			self.sendError(req_id, "RuntimeError", err);
		}
	}, 0);
	return req_id;
}

/**
 * Checking unprocessed purchases
 * @param purchase_token {string} Purchase Token.
 * @returns {Number} Request ID
 */
function YaGamesGMS_Payments_ConsumePurchase(purchase_token) {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "Consume Purchase", req_id);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
			return;
		}
		if (!self.getPaymentsInitStatus()) {
			self.sendPaymentsNotInitStatus(req_id);
			return;
		}
		try {
			self._payments.consumePurchase(purchase_token)
				.then(() => {
					self.browserConsoleLog( "Consume purchase requested", req_id);
					self.send(req_id, "consumePurchase");
				})
				.catch((err) => {
					self.browserConsoleLog( "Consume purchase error", req_id, err);
					self.sendError(req_id, "consumePurchaseError", err);
				});

		} catch (err) {
			self.browserConsoleLog( "Runtime error", req_id, err);
			self.sendError(req_id, "RuntimeError", err);
		}
	}, 0);
	return req_id;
}

/**
 * Get Remote configuration
 * @param defaultFlags {string} Local configuration. Flat object, values are strings in JSON format
 * @param clientFeatures {string} Client parameters. A key-value array in JSON format
 * @returns {number} Request ID
 */
function YaGamesGMS_GetFlags(defaultFlags = "", clientFeatures = "") {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "Get Flags", req_id);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
			return;
		}
		try {
			let _options = undefined;
			if ((defaultFlags.length > 0) || (clientFeatures.length > 0)) {
				_options = {
					defaultFlags: (defaultFlags.length > 0) ? self.parseJson(defaultFlags) : {}
				};
				if (clientFeatures.length > 0) {
					_options.clientFeatures = [];
					let _t = self.parseJson(clientFeatures);
					for (let _k in _t) {
						if (_t.hasOwnProperty(_k)) {
							_options.clientFeatures.push({ name: String(_k), value: String(_t[_k]) });
						}
					}
				}
			}
			self._ysdk.getFlags(_options)
				.then((flags) => {
					self.browserConsoleLog( "Get Flags requested", req_id, flags);
					self.send(req_id, "getFlags", flags);
				})
				.catch((err) => {
					self.browserConsoleLog( "Get Flags error", req_id, err);
					self.sendError(req_id, "getFlagsError", err);
				});
		} catch (err) {
			self.browserConsoleLog( "Runtime error", req_id, err);
			self.sendError(req_id, "RuntimeError", err);
		}
	}, 0);
	return req_id;
}

/**
 * Dispatch an event
 * @param event_name {string} Event name
 * @param detail {?string} Event details object in JSON format
 * @returns {number} Request ID
 */
function YaGamesGMS_Event_Dispatch(event_name, detail = null) {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "Event Dispatch", req_id);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
			return;
		}
		try {
			let _o = (detail == null) ? undefined : JSON.parse(detail);
			self._ysdk.dispatchEvent(self._ysdk.EVENTS[event_name], _o)
				.then(() => {
					self.browserConsoleLog( "eventDispatch", req_id, event_name);
					self.send(req_id, "eventDispatch", event_name);
				})
				.catch((err) => {
					self.browserConsoleLog( "Event Dispatch error", req_id, err);
					self.sendError(req_id, "eventDispatchError", err);
				});
		} catch (err) {
			self.browserConsoleLog( "Runtime error", req_id, err);
			self.sendError(req_id, "RuntimeError", err);
		}
	}, 0);
	return req_id;
}

/**
 * Enabling event listening
 * @param event_name {string} Event name
 * @returns {number} Request ID
 */
function YaGamesGMS_Event_On(event_name) {
	let self = YaGamesGMS;
	let req_id = self.newRequest();
	setTimeout(function run() {
		self.browserConsoleLog( "On Event", req_id);
		if (!self.getInitStatus()) {
			self.sendSdkNotInitStatus(req_id);
			return;
		}
		try {
			self._ysdk.onEvent(self._ysdk.EVENTS[event_name], () => {
				self.browserConsoleLog( "onEvent", req_id, event_name);
				self.send(req_id, "onEvent", event_name);
			});
		} catch (err) {
			self.browserConsoleLog( "Runtime error", req_id, err);
			self.sendError(req_id, "RuntimeError", err);
		}
	}, 0);
	return req_id;
}
