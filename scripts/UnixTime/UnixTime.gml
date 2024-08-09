/// @func   get_unixtime()
/// @desc   Returns Unix timestamp.
function get_unixtime(){
    var _timezone = date_get_timezone();
 
    date_set_timezone(timezone_utc);
    var _epoch = floor(date_create_datetime(1970, 1, 1, 0, 0, 0));
    
    date_set_timezone(_timezone);
    var _datetime = date_current_datetime();
    
    var _timestamp = floor(date_second_span(_epoch, _datetime));
 
    return _timestamp;
}

/// @func   convert_unixtime(unix_timestamp)
/// @desc   Returns GameMaker datetime from Unix timestamp.
function convert_unixtime(_timestamp){
	var _t = date_inc_second(25569+1, _timestamp);
	return date_inc_day(_t, -1);
}