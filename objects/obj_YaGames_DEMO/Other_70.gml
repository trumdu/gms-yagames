/// @description Parse YaGames events
if (not isMap(async_load)) {
    log("async_load got lost in cyberspace");
} else {
    if (async_load[? "type"] == "YaGames") {
		
        msg = "YaGames async event received!" + chr(10);
        msg += json_encode(async_load);
        log(msg);
		
        switch (async_load[? "event"]) {
			// FullScreen Ads
            case "adShownAndClosed":
                // Ads displayed successfully
            break;
            case "adClosed":
                // The ad is closed but has not been shown
            break;
            case "adOpened":
                // Advertising is open
            break;
            case "offlineMode":
                // The device has lost its connection to the Internet
            break;
            case "adError":
                var errorDesc = async_load[? "error"];
                // Error displaying ads
            break;
			// Video Ads
            case "rewardOpened":
                // Video advertising is open
            break;
            case "rewardReceived":
                // The video ads has been successfully completed. The reward has been received.
            break;
            case "rewardClosed":
                // The video ads is closed
            break;
            case "rewardError":
                var errorDesc = async_load[? "error"];
                // Error displaying video ads
            break;
			// All request
            case "notInitSDK":
                // SDK не инициализирован
            break;
            case "RuntimeError":
                var errorDesc = async_load[? "error"];
                // SDK runtime error
            break;
			
			/*
            case "adShowFailed":
                ironSrc_adFailedToShow();
            break;
            case "rewardOpened":
                paused = true;
                ironSrc_rewardOpened();
            break;
            case "rewardClosed":
                paused = false;
                ironSrc_rewardClosed();
            break;
            case "rewardAvailable":
                ironSrc_rewardAvailable();
            break;
            case "rewardUnavailable":
                ironSrc_rewardUnavailable();
            break;
            case "rewardStarted":
                ironSrc_rewardStarted();
            break;
            case "rewardEnded":
                ironSrc_rewardEnded();
            break;
            case "rewardReceived":
                var rName = async_load[? "reward"],
                    rAmount = async_load[? "amount"];
                ironSrc_rewardReceived(rName, rAmount);
            break;
            case "rewardShowFailed":
                ironSrc_rewardFailedToShow();
            break;
            case "rewardClicked":
                var rName = async_load[? "reward"],
                    rAmount = async_load[? "amount"];
                ironSrc_rewardClicked(rName, rAmount);
            break;
            case "offerwallAvailable":
                ironSrc_offerwallAvailable();
            break;
            case "offerwallUnavailable":
                ironSrc_offerwallUnavailable();
            break;
            case "offerwallOpened":
                paused = true;
                ironSrc_offerwallOpened();
            break;
            case "offerwallShowFailed":
                ironSrc_offerwallFailedToShow();
            break;
            case "offerwallCredited":
                var oCredits = async_load[? "credits"],
                    oTotal = async_load[? "totalCredits"],
                    oIsTotal = async_load[? "isTotal"]; //In some cases, ironSource can't tell how many credits you've got in THIS session
                    //In those cases, you won't be able to increment the in-game currency; rather, ironSource sets both the credits and total credits
                    //fields to the same value, and also notifies us via a flag (called "isTotal" in this extension). When this occurs, instead of
                    //incrementing the currency, we just set the value to what ironSource tells us in any of the fields.
                    //We only need to do this if the "isTotal" flag is set to TRUE
                ironSrc_offerwallCredited(oCredits, oTotal, oIsTotal);
            break;
            case "offerwallCreditFailed":
                ironSrc_offerwallFailedToCredit();
            break;
            case "offerwallClosed":
                paused = false;
                ironSrc_offerwallClosed();
            break;*/
        }
   }
}

