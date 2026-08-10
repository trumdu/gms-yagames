/// @description Parse YaGames events
if (not isMap(async_load)) {
    log("async_load got lost in cyberspace");
} else {
    if ((async_load[? "type"]== YaGames_AsyncEvent) and (async_load[? "request_id"] == req_id)) {
        var _msg = json_encode(async_load);
        log(_msg);
        switch (async_load[? "event"]) {
            case YaGames_CallIsAvailableMethod:
                log("available=" + string(async_load[? "value"]));
            break;
            case YaGames_CallIsAvailableMethodError:
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
