/// @func   convert_datetime_to_iso8601(double datetime)
/// @desc   Returns ISO 8601 datetime string.
function convert_datetime_to_iso8601(_dt){
	var _tz = date_get_timezone();
	date_set_timezone(timezone_utc);
	//
	var _s = string(date_get_year(_dt)) + "-";
	//
	if (date_get_month(_dt) < 10) _s += "0";
	_s += string(date_get_month(_dt)) + "-";
	//
	if (date_get_day(_dt) < 10) _s += "0";
	_s += string(date_get_day(_dt)) + "T";
	//
	if (date_get_hour(_dt) < 10) _s += "0";
	_s += string(date_get_hour(_dt)) + ":";
	//
	if (date_get_minute(_dt) < 10) _s += "0";
	_s += string(date_get_minute(_dt)) + ":";
	//
	if (date_get_second(_dt) < 10) _s += "0";
	_s += string(date_get_second(_dt)) + ".";
	// Milliseconds are not supported
	_s += "000Z";
	//
	date_set_timezone(_tz);
	return _s;
}