// Async Yandex Games SDK 2 
(function(d) {
	console.log('Yandex SDK start load script');
	var t = d.getElementsByTagName('script')[0];
	var s = d.createElement('script');
	s.src = 'https://yandex.ru/games/sdk/v2';
	s.async = true;
	t.parentNode.insertBefore(s, t);
	s.onload = YaGamesGMS_initSKD;
})(document);

var YaGamesGMS_isInit = false;
var YaGamesGMS_mapTypeDesc = "YaGames";
var YaGamesGMS_notInitDesc = "notInitSDK";
var YaGamesGMS_isDebug = false;
var YaGamesGMS_adStart = false;

function YaGamesGMS_initSKD() {
	YaGames.init().then(ysdk => {
        console.log('Yandex SDK initialized');
		YaGamesGMS_isInit = true;
        window.ysdk = ysdk;
    });
}

/**
 * Проверка на готовность SDK к работе
 * @returns 1 0
 */
function YaGamesGMS_getIsInit() {
	if (YaGamesGMS_isInit) {
		if (YaGamesGMS_isDebug) console.log("SDK is Inited");
		return 1;
	}	
	if (YaGamesGMS_isDebug) console.log("SDK not Inited");
	return 0;
}

/**
 * Разрешаем вывод сообщений в консоль браузера
 * @param {Number} debugStatus 
 */
function YaGamesGMS_setDebugMode(debugStatus) {
	if (debugStatus > 0) {
		console.log("Debug mode enabled");
		YaGamesGMS_isDebug = true;
	}	
	else {
		YaGamesGMS_isDebug = false;
	}
}

/**
 * Возвращаем в GM асинхронное событие
 * @param {string} event_mes Тип события
 * @param {string} console_mes Текст для вывода в консоль браузера при активном режиме отладки
 * @param {string} error_mes Текст ошибки
 */
function YaGamesGMS_return_async_event(event_mes, console_mes = "", error_mes = "") {
		
	let _error_mes = String(error_mes);
	let _console_mes = String(console_mes);

	let map = {};
	map["type"] = YaGamesGMS_mapTypeDesc;
	
	map["event"] = String(event_mes);
	if (_error_mes.length > 0) map["error"] = _error_mes;
	
	GMS_API.send_async_event_social(map);

	if (_console_mes.length > 0) {
		if (YaGamesGMS_isDebug) console.log(_console_mes);
	};
	
}

/**
 * Запрос на показ полноэкранной рекламы
 */
function YaGamesGMS_showFullscreenAdv() {
	
	if (YaGamesGMS_isDebug) console.log("FullScreen ad requested");
	
	if (YaGamesGMS_isInit) {

		YaGamesGMS_adStart = true;
		try {
			window.ysdk.adv.showFullscreenAdv({
				callbacks: {
					onClose: (wasShown) => {
						if (YaGamesGMS_adStart) {
							if (wasShown) {
								YaGamesGMS_return_async_event("adShownAndClosed", "FullScreen ad was shown and closed.");
							}
							else  {
								YaGamesGMS_return_async_event("adClosed", "FullScreen ad closed.");
							}
							YaGamesGMS_adStart = false;
						}
					},
					onOpen: () => {
						YaGamesGMS_return_async_event("adOpened", "FullScreen ad opened.");
					},
					onOffline: () => {
						YaGamesGMS_return_async_event("offlineMode", "FullScreen ad. Offline mode.");
					},
					onError: (err) => {
						YaGamesGMS_return_async_event("adError", "Failed FullScreen ad show: " + String(err), String(err));
						YaGamesGMS_adStart = false;
					},
				},
			});
		} catch (err) {
			YaGamesGMS_return_async_event("RuntimeError", "FullScreen runtime error: " + String(err), String(err));
			YaGamesGMS_adStart = false;
		}
	}
	else {
		YaGamesGMS_return_async_event(YaGamesGMS_notInitDesc, YaGamesGMS_notInitDesc);
	}
	
}

/**
 * Запрос на показ видео рекламы с вознаграждением
 */
function YaGamesGMS_showRewardedVideo() {
	
	if (YaGamesGMS_isDebug) console.log("Reward ad requested");
	
	if (YaGamesGMS_isInit) {

		YaGamesGMS_adStart = true;
		try {
            window.ysdk.adv.showRewardedVideo({
                callbacks: {
                    onOpen: () => {
						YaGamesGMS_return_async_event("rewardOpened", "Reward ad opened.");
                    },
                    onRewarded: () => {
						YaGamesGMS_return_async_event("rewardReceived", "Rewarded!");
						YaGamesGMS_adStart = false;
                    },
                    onClose: () => {
						if (YaGamesGMS_adStart) {
							YaGamesGMS_return_async_event("rewardClosed", "Reward ad closed.");
							YaGamesGMS_adStart = false;
						}
                    },
                    onError: (err) => {
						YaGamesGMS_return_async_event("rewardError", "Failed Reward ad show: " + String(err), String(err));
						YaGamesGMS_adStart = false;
                    },
                },
            });			
		} catch (err) {
			YaGamesGMS_return_async_event("RuntimeError", "Reward runtime error: " + String(err), String(err));
			YaGamesGMS_adStart = false;
		}
	}
	else {
		YaGamesGMS_return_async_event(YaGamesGMS_notInitDesc, YaGamesGMS_notInitDesc);
	}
	
}