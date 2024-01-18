{
  "resourceType": "GMExtension",
  "resourceVersion": "1.2",
  "name": "YaGames",
  "androidactivityinject": "",
  "androidclassname": "",
  "androidcodeinjection": "",
  "androidinject": "",
  "androidmanifestinject": "",
  "androidPermissions": [],
  "androidProps": false,
  "androidsourcedir": "",
  "author": "",
  "classname": "",
  "copyToTargets": 32,
  "date": "2020-10-03T02:05:14",
  "description": "",
  "exportToGame": true,
  "extensionVersion": "1.0.7",
  "files": [
    {"resourceType":"GMExtensionFile","resourceVersion":"1.0","name":"","constants":[
        {"resourceType":"GMExtensionConstant","resourceVersion":"1.0","name":"YaGames_DeviceMobile","hidden":false,"value":"\"mobile\"",},
        {"resourceType":"GMExtensionConstant","resourceVersion":"1.0","name":"YaGames_DeviceTablet","hidden":false,"value":"\"tablet\"",},
        {"resourceType":"GMExtensionConstant","resourceVersion":"1.0","name":"YaGames_DeviceDesktop","hidden":false,"value":"\"desktop\"",},
        {"resourceType":"GMExtensionConstant","resourceVersion":"1.0","name":"YaGames_DeviceUndefined","hidden":false,"value":"\"undefined\"",},
        {"resourceType":"GMExtensionConstant","resourceVersion":"1.0","name":"YaGames_AvatarSizeSmall","hidden":false,"value":"\"small\"",},
        {"resourceType":"GMExtensionConstant","resourceVersion":"1.0","name":"YaGames_AvatarSizeMedium","hidden":false,"value":"\"medium\"",},
        {"resourceType":"GMExtensionConstant","resourceVersion":"1.0","name":"YaGames_AvatarSizeLarge","hidden":false,"value":"\"large\"",},
        {"resourceType":"GMExtensionConstant","resourceVersion":"1.0","name":"YaGames_FullScreen_ON","hidden":false,"value":"\"on\"",},
        {"resourceType":"GMExtensionConstant","resourceVersion":"1.0","name":"YaGames_FullScreen_OFF","hidden":false,"value":"\"off\"",},
        {"resourceType":"GMExtensionConstant","resourceVersion":"1.0","name":"YaGames_DeviceTV","hidden":false,"value":"\"tv\"",},
        {"resourceType":"GMExtensionConstant","resourceVersion":"1.0","name":"YaGames_Event_EXIT","hidden":false,"value":"\"EXIT\"",},
        {"resourceType":"GMExtensionConstant","resourceVersion":"1.0","name":"YaGames_Event_HISTORY_BACK","hidden":false,"value":"\"HISTORY_BACK\"",},
        {"resourceType":"GMExtensionConstant","resourceVersion":"1.0","name":"YaGames_AsyncEvent","hidden":false,"value":"\"YaGames\"",},
        {"resourceType":"GMExtensionConstant","resourceVersion":"1.0","name":"YaGames_CallRuntimeError","hidden":false,"value":"\"RuntimeError\"",},
        {"resourceType":"GMExtensionConstant","resourceVersion":"1.0","name":"YaGames_CallNotInitSDK","hidden":false,"value":"\"notInitSDK\"",},
      ],"copyToTargets":144115188075855904,"filename":"YaGames.js","final":"","functions":[
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_getInitStatus","argCount":0,"args":[],"documentation":"","externalName":"YaGamesGMS_getInitStatus","help":"YaGames_getInitStatus()","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_setDebugMode","argCount":0,"args":[
            2,
          ],"documentation":"","externalName":"YaGamesGMS_setDebugMode","help":"YaGames_setDebugMode( enable (1) / disable (0) )","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_showFullscreenAdv","argCount":0,"args":[],"documentation":"","externalName":"YaGamesGMS_showFullscreenAdv","help":"YaGames_showFullscreenAdv()","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_showRewardedVideo","argCount":0,"args":[],"documentation":"","externalName":"YaGamesGMS_showRewardedVideo","help":"YaGames_showRewardedVideo()","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_pageReload","argCount":0,"args":[],"documentation":"","externalName":"YaGamesGML_pageReload","help":"YaGames_pageReload()","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_getBrowserLang","argCount":0,"args":[],"documentation":"","externalName":"YaGamesGML_getBrowserLang","help":"YaGames_getBrowserLang()","hidden":false,"kind":5,"returnType":1,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_getEnvironment","argCount":0,"args":[],"documentation":"","externalName":"YaGamesGML_getEnvironment","help":"YaGames_getEnvironment()","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_setToClipboard","argCount":0,"args":[
            1,
          ],"documentation":"","externalName":"YaGamesGML_setToClipboard","help":"YaGames_setToClipboard(text)","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_getDeviceType","argCount":0,"args":[],"documentation":"","externalName":"YaGamesGML_DeviceInfo_getType","help":"YaGames_getDeviceType()","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_Leaderboards_getByDescription","argCount":0,"args":[
            1,
          ],"documentation":"","externalName":"YaGamesGML_Leaderboards_getByDescription","help":"YaGames_Leaderboards_getByDescription(leaderboard_name)","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_Leaderboards_getPlayerEntryAvatar","argCount":0,"args":[
            1,
            1,
            1,
          ],"documentation":"","externalName":"YaGamesGML_Leaderboards_getPlayerEntry","help":"YaGames_Leaderboards_getPlayerEntryAvatar(leaderboard_name, avatarSrcSize, avatarSrcSetSize)","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_Leaderboards_getEntriesAvatar","argCount":0,"args":[
            1,
            1,
            1,
          ],"documentation":"","externalName":"YaGamesGML_Leaderboards_getEntries","help":"YaGames_Leaderboards_getEntriesAvatar(leaderboard_name, avatarSrcSize, avatarSrcSetSize)","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_Leaderboards_getEntriesOptions","argCount":0,"args":[
            1,
            1,
            1,
            2,
            2,
            2,
          ],"documentation":"","externalName":"YaGamesGML_Leaderboards_getEntries","help":"YaGames_Leaderboards_getEntriesOptions(leaderboard_name, avatarSrcSize, avatarSrcSetSize, includeUser, quantityAround, quantityTop)","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_Leaderboards_setScore","argCount":0,"args":[
            1,
            2,
          ],"documentation":"","externalName":"YaGamesGML_Leaderboards_setScore","help":"YaGames_Leaderboards_setScore(leaderboard_name, score)","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_Leaderboards_setScoreExtraData","argCount":0,"args":[
            1,
            2,
            1,
          ],"documentation":"","externalName":"YaGamesGML_Leaderboards_setScore","help":"YaGames_Leaderboards_setScore(leaderboard_name, score, extra_data)","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_browserConsoleLog","argCount":0,"args":[
            1,
          ],"documentation":"","externalName":"YaGamesGML_browserConsoleLog","help":"YaGames_browserConsoleLog(str)","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_Leaderboards_Init","argCount":0,"args":[],"documentation":"","externalName":"YaGamesGML_Leaderboards_Init","help":"YaGames_Leaderboards_Init()","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_Leaderboards_getPlayerEntry","argCount":0,"args":[
            1,
          ],"documentation":"","externalName":"YaGamesGML_Leaderboards_getPlayerEntry","help":"YaGames_Leaderboards_getPlayerEntry(leaderboard_name)","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_Leaderboards_getEntries","argCount":0,"args":[
            1,
          ],"documentation":"","externalName":"YaGamesGML_Leaderboards_getEntries","help":"YaGames_Leaderboards_getEntries(leaderboard_name)","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_OpenAuthDialog","argCount":0,"args":[],"documentation":"","externalName":"YaGamesGML_OpenAuthDialog","help":"YaGames_OpenAuthDialog()","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_Screen_Fullscreen_Status","argCount":0,"args":[],"documentation":"","externalName":"YaGamesGMS_Screen_Fullscreen_Status","help":"YaGames_Screen_Fullscreen_Status()","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_Screen_Fullscreen_Request","argCount":0,"args":[],"documentation":"","externalName":"YaGamesGMS_Screen_Fullscreen_Request","help":"YaGames_Screen_Fullscreen_Request()","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_Screen_Fullscreen_Exit","argCount":0,"args":[],"documentation":"","externalName":"YaGamesGMS_Screen_Fullscreen_Exit","help":"YaGames_Screen_Fullscreen_Exit()","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_Feedback_CanReview","argCount":0,"args":[],"documentation":"","externalName":"YaGamesGMS_Feedback_CanReview","help":"YaGames_Feedback_CanReview()","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_Feedback_RequestReview","argCount":0,"args":[],"documentation":"","externalName":"YaGamesGMS_Feedback_RequestReview","help":"YaGames_Feedback_RequestReview()","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_Player_Init","argCount":-1,"args":[
            2,
          ],"documentation":"","externalName":"YaGamesGML_Player_Init","help":"YaGames_Player_Init(scopes = 0)","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_Player_GetUniqueID","argCount":0,"args":[],"documentation":"","externalName":"YaGamesGML_Player_GetUniqueID","help":"YaGames_Player_GetUniqueID()","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_Player_GetIDsPerGame","argCount":0,"args":[],"documentation":"","externalName":"YaGamesGML_Player_GetIDsPerGame","help":"YaGames_Player_GetIDsPerGame()","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_Player_GetPhoto","argCount":0,"args":[
            1,
          ],"documentation":"","externalName":"YaGamesGML_Player_GetPhoto","help":"YaGames_Player_GetPhoto(avatarSize)","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_Player_SetData","argCount":-1,"args":[
            1,
            2,
          ],"documentation":"","externalName":"YaGamesGML_Player_SetData","help":"YaGames_Player_SetData(data, flush = 0)","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_Player_GetData","argCount":0,"args":[
            1,
          ],"documentation":"","externalName":"YaGamesGML_Player_GetData","help":"YaGames_Player_GetData(keys)","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_Player_SetStats","argCount":0,"args":[
            1,
          ],"documentation":"","externalName":"YaGamesGML_Player_SetStats","help":"YaGames_Player_SetStats(stats)","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_Player_GetStats","argCount":0,"args":[
            1,
          ],"documentation":"","externalName":"YaGamesGML_Player_GetStats","help":"YaGames_Player_GetStats(keys)","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_Player_IncrementStats","argCount":0,"args":[
            1,
          ],"documentation":"","externalName":"YaGamesGML_Player_IncrementStats","help":"YaGames_Player_IncrementStats(increments)","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_Player_GetAllData","argCount":0,"args":[],"documentation":"","externalName":"YaGamesGML_Player_GetData","help":"YaGames_Player_GetAllData()","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_Player_GetAllStats","argCount":0,"args":[],"documentation":"","externalName":"YaGamesGML_Player_GetStats","help":"YaGames_Player_GetAllStats()","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_Shortcut_CanShowPrompt","argCount":0,"args":[],"documentation":"","externalName":"YaGamesGMS_Shortcut_CanShowPrompt","help":"YaGames_Shortcut_CanShowPrompt()","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_Shortcut_ShowPrompt","argCount":0,"args":[],"documentation":"","externalName":"YaGamesGMS_Shortcut_ShowPrompt","help":"YaGames_Shortcut_ShowPrompt()","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_Banner_getAdvStatus","argCount":0,"args":[],"documentation":"","externalName":"YaGamesGML_Banner_getAdvStatus","help":"YaGames_Banner_getAdvStatus()","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_Banner_ShowAdv","argCount":0,"args":[],"documentation":"","externalName":"YaGamesGML_Banner_ShowAdv","help":"YaGames_Banner_ShowAdv()","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_Banner_HideAdv","argCount":0,"args":[],"documentation":"","externalName":"YaGamesGML_Banner_HideAdv","help":"YaGames_Banner_HideAdv()","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_Payments_Init","argCount":-1,"args":[
            2,
          ],"documentation":"","externalName":"YaGamesGML_Payments_Init","help":"YaGames_Payments_Init(signed = 1)","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_Payments_Purchase","argCount":-1,"args":[
            1,
            1,
          ],"documentation":"","externalName":"YaGamesGMS_Payments_Purchase","help":"YaGames_Payments_Purchase(id, developerPayload = \"\")","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_Payments_GetPurchases","argCount":0,"args":[],"documentation":"","externalName":"YaGamesGMS_Payments_GetPurchases","help":"YaGames_Payments_GetPurchases()","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_Payments_GetCatalog","argCount":0,"args":[],"documentation":"","externalName":"YaGamesGMS_Payments_GetCatalog","help":"YaGames_Payments_GetCatalog()","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_Payments_ConsumePurchase","argCount":0,"args":[
            1,
          ],"documentation":"","externalName":"YaGamesGMS_Payments_ConsumePurchase","help":"YaGames_Payments_ConsumePurchase(purchase_token)","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_MobileVibro","argCount":-1,"args":[
            2,
          ],"documentation":"","externalName":"YaGamesGML_MobileVibro","help":"YaGames_MobileVibro(double ms = 200)","hidden":false,"kind":5,"returnType":1,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_Player_GetMode","argCount":0,"args":[],"documentation":"","externalName":"YaGamesGML_Player_GetMode","help":"YaGames_Player_GetMode()","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_GameReadyOn","argCount":0,"args":[],"documentation":"","externalName":"YaGamesGMS_GameReadyOn","help":"YaGamesGMS_GameReadyOn()","hidden":false,"kind":5,"returnType":1,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_GetFlags","argCount":-1,"args":[
            1,
            1,
          ],"documentation":"","externalName":"YaGamesGMS_GetFlags","help":"YaGames_GetFlags(defaultFlags = \"\", clientFeatures = \"\")","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_Event_Dispatch","argCount":-1,"args":[
            1,
            1,
          ],"documentation":"","externalName":"YaGamesGMS_Event_Dispatch","help":"YaGames_Event_Dispatch(string event_name, detail = \"\")","hidden":false,"kind":5,"returnType":2,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"YaGames_Event_On","argCount":0,"args":[
            1,
          ],"documentation":"","externalName":"YaGamesGMS_Event_On","help":"YaGames_Event_On(event_name)","hidden":false,"kind":5,"returnType":2,},
      ],"init":"","kind":5,"order":[
        {"name":"YaGames_getInitStatus","path":"extensions/YaGames/YaGames.yy",},
        {"name":"YaGames_setDebugMode","path":"extensions/YaGames/YaGames.yy",},
        {"name":"YaGames_browserConsoleLog","path":"extensions/YaGames/YaGames.yy",},
        {"name":"YaGames_pageReload","path":"extensions/YaGames/YaGames.yy",},
        {"name":"YaGames_getBrowserLang","path":"extensions/YaGames/YaGames.yy",},
        {"name":"YaGames_showFullscreenAdv","path":"extensions/YaGames/YaGames.yy",},
        {"name":"YaGames_showRewardedVideo","path":"extensions/YaGames/YaGames.yy",},
        {"name":"YaGames_getEnvironment","path":"extensions/YaGames/YaGames.yy",},
        {"name":"YaGames_getDeviceType","path":"extensions/YaGames/YaGames.yy",},
        {"name":"YaGames_setToClipboard","path":"extensions/YaGames/YaGames.yy",},
        {"name":"YaGames_Leaderboards_Init","path":"extensions/YaGames/YaGames.yy",},
        {"name":"YaGames_Leaderboards_getByDescription","path":"extensions/YaGames/YaGames.yy",},
        {"name":"YaGames_Leaderboards_getPlayerEntry","path":"extensions/YaGames/YaGames.yy",},
        {"name":"YaGames_Leaderboards_getPlayerEntryAvatar","path":"extensions/YaGames/YaGames.yy",},
        {"name":"YaGames_Leaderboards_getEntries","path":"extensions/YaGames/YaGames.yy",},
        {"name":"YaGames_Leaderboards_getEntriesAvatar","path":"extensions/YaGames/YaGames.yy",},
        {"name":"YaGames_Leaderboards_getEntriesOptions","path":"extensions/YaGames/YaGames.yy",},
        {"name":"YaGames_Leaderboards_setScore","path":"extensions/YaGames/YaGames.yy",},
        {"name":"YaGames_Leaderboards_setScoreExtraData","path":"extensions/YaGames/YaGames.yy",},
        {"name":"YaGames_OpenAuthDialog","path":"extensions/YaGames/YaGames.yy",},
        {"name":"YaGames_Screen_Fullscreen_Status","path":"extensions/YaGames/YaGames.yy",},
        {"name":"YaGames_Screen_Fullscreen_Request","path":"extensions/YaGames/YaGames.yy",},
        {"name":"YaGames_Screen_Fullscreen_Exit","path":"extensions/YaGames/YaGames.yy",},
        {"name":"YaGames_Feedback_CanReview","path":"extensions/YaGames/YaGames.yy",},
        {"name":"YaGames_Feedback_RequestReview","path":"extensions/YaGames/YaGames.yy",},
        {"name":"YaGames_Player_Init","path":"extensions/YaGames/YaGames.yy",},
        {"name":"YaGames_Player_GetUniqueID","path":"extensions/YaGames/YaGames.yy",},
        {"name":"YaGames_Player_GetIDsPerGame","path":"extensions/YaGames/YaGames.yy",},
        {"name":"YaGames_Player_GetPhoto","path":"extensions/YaGames/YaGames.yy",},
        {"name":"YaGames_Player_SetData","path":"extensions/YaGames/YaGames.yy",},
        {"name":"YaGames_Player_GetData","path":"extensions/YaGames/YaGames.yy",},
        {"name":"YaGames_Player_SetStats","path":"extensions/YaGames/YaGames.yy",},
        {"name":"YaGames_Player_GetStats","path":"extensions/YaGames/YaGames.yy",},
        {"name":"YaGames_Player_IncrementStats","path":"extensions/YaGames/YaGames.yy",},
        {"name":"YaGames_Player_GetAllData","path":"extensions/YaGames/YaGames.yy",},
        {"name":"YaGames_Player_GetAllStats","path":"extensions/YaGames/YaGames.yy",},
      ],"origname":"","ProxyFiles":[],"uncompress":false,"usesRunnerInterface":false,},
    {"resourceType":"GMExtensionFile","resourceVersion":"1.0","name":"","constants":[],"copyToTargets":-1,"filename":"browser_hdpi.js","final":"","functions":[
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"browser_get_device_pixel_ratio","argCount":0,"args":[],"documentation":"","externalName":"browser_get_device_pixel_ratio","help":"browser_get_device_pixel_ratio()","hidden":false,"kind":5,"returnType":1,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"browser_stretch_canvas_ext","argCount":0,"args":[
            2,
            2,
            2,
          ],"documentation":"","externalName":"browser_stretch_canvas_ext","help":"browser_stretch_canvas_ext(canvas_id, w, h)","hidden":false,"kind":5,"returnType":1,},
        {"resourceType":"GMExtensionFunction","resourceVersion":"1.0","name":"browser_scrollbars_enable","argCount":0,"args":[
            2,
          ],"documentation":"","externalName":"browser_scrollbars_enable","help":"browser_scrollbars_enable(z)","hidden":false,"kind":5,"returnType":1,},
      ],"init":"","kind":5,"order":[],"origname":"","ProxyFiles":[],"uncompress":false,"usesRunnerInterface":false,},
  ],
  "gradleinject": "",
  "hasConvertedCodeInjection": true,
  "helpfile": "",
  "HTML5CodeInjection": "<GM_HTML5_PostStyle>\r\n<style>\r\n    body\r\n    {\r\n        overflow:hidden;\r\n    }\r\n</style>\r\n</GM_HTML5_PostStyle>\r\n\r\n<GM_HTML5_PreBody>\r\n\t<script>\r\n\t\tvar YaGames_send_game_start = \"${YYEXTOPT_YaGames_send_game_start}\".toLowerCase() == \"true\";\r\n\t</script>\r\n</GM_HTML5_PreBody>",
  "html5Props": true,
  "IncludedResources": [],
  "installdir": "",
  "iosCocoaPodDependencies": "",
  "iosCocoaPods": "",
  "ioscodeinjection": "",
  "iosdelegatename": "",
  "iosplistinject": "",
  "iosProps": false,
  "iosSystemFrameworkEntries": [],
  "iosThirdPartyFrameworkEntries": [],
  "license": "",
  "maccompilerflags": "",
  "maclinkerflags": "",
  "macsourcedir": "",
  "options": [
    {"resourceType":"GMExtensionOption","resourceVersion":"1.0","name":"send_game_start","defaultValue":"True","description":"Automatically send a notification about the start of the game.","displayName":"Auto send  GameStart","exportToINI":false,"extensionId":null,"guid":"376ef55b-6b11-4791-9168-21492300d362","hidden":false,"listItems":[],"optType":0,},
  ],
  "optionsFile": "options.json",
  "packageId": "",
  "parent": {
    "name": "Extensions",
    "path": "folders/Extensions.yy",
  },
  "productId": "",
  "sourcedir": "",
  "supportedTargets": -1,
  "tvosclassname": "",
  "tvosCocoaPodDependencies": "",
  "tvosCocoaPods": "",
  "tvoscodeinjection": "",
  "tvosdelegatename": "",
  "tvosmaccompilerflags": "",
  "tvosmaclinkerflags": "",
  "tvosplistinject": "",
  "tvosProps": false,
  "tvosSystemFrameworkEntries": [],
  "tvosThirdPartyFrameworkEntries": [],
}