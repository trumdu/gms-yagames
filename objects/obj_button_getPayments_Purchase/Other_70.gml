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
			
            case YaGames_CallPurchaseRequested:
                // Payments Purchasen success
				var _purchase = json_parse(async_load[? "data"]);
				log("Purchase ID: " + _purchase.productID);
				//_purchase.purchaseToken
				//_purchase.purchaseTime
				//_purchase.developerPayload
            break;
            case YaGames_CallPurchaseRequestError:
                var errCode = async_load[? "code"];
                var errName = async_load[? "name"];
                var errMessage = async_load[? "message"];			
                // Payments Purchasen error
				
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

