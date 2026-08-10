/// @description Parse YaGames events
if (not isMap(async_load)) {
    log("async_load got lost in cyberspace");
} else {
    if ((async_load[? "type"]== YaGames_AsyncEvent) and (async_load[? "request_id"] == req_id)) {
        var _msg = json_encode(async_load);
        log(_msg);
        switch (async_load[? "event"]) {
            case YaGames_CallStorageSetItem:
                req_id = YaGames_Storage_GetItem("yg_demo_key");
                log("Storage GetItem reqId: " + string(req_id));
            break;
            case YaGames_CallStorageGetItem:
                log("Storage value: " + string(async_load[? "value"]));
            break;
            case YaGames_CallStorageError:
            break;
            case YaGames_CallNotInitSDK:
            break;
            case YaGames_CallRuntimeError:
                var errCode = async_load[? "code"];
                var errName = async_load[? "name"];
                var errMessage = async_load[? "message"];
            break;
        }
   }
}
