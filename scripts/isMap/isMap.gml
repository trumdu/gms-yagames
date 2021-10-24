/// @description isMap(map index)
/// @param map index
function isMap(argument0) {
	//Checks for the existence of a data structure taking GM's inconsistency into account
	gml_pragma("forceinline");

	if (not is_undefined(argument0)) {
	    if (ds_exists(argument0, ds_type_map)) {
	        return true;
	    } else {
	        return false;
	    }
	} else {
	    return false;
	}



}
