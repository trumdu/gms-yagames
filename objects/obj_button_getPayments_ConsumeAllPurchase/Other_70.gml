/// @description Parse YaGames events
if (not isMap(async_load)) {
    log("async_load got lost in cyberspace");
} else {
    if ((async_load[? "type"]== YaGames_AsyncEvent) and (async_load[? "request_id"] == req_id)) {
		// Logging
        var _msg = json_encode(async_load);
        log(_msg);
		//
        switch (async_load[? "event"]) {	
			
            case YaGames_CallGetPurchases:
                // Get Purchases success
				var _data = json_parse(async_load[? "data"]);
				array_foreach(_data, function(_element)
				{
					log("Consume Purchase: " + _element.purchaseToken);
					YaGames_Payments_ConsumePurchase(_element.purchaseToken);
				});
            break;
            case YaGames_CallGetPurchasesError:
                var errCode = async_load[? "code"];
                var errName = async_load[? "name"];
                var errMessage = async_load[? "message"];			
                // Get Purchases error
            break;
			
            case YaGames_CallNotPaymentsInitSDK:
                // Payments in SDK not initialized
            break;
            case YaGames_CallNotInitSDK:
                // SDK not initialized
            break;
            case YaGames_CallRuntimeError:
                var errCode = async_load[? "code"];
                var errName = async_load[? "name"];
                var errMessage = async_load[? "message"];	
                // SDK runtime error
            break;
        }
   }
}

