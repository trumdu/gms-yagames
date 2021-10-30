/// @description log(x)
/// @param x
function log(argument0) {
	gml_pragma("forceinline");
	obj_log_output.add_log(argument0);
}
