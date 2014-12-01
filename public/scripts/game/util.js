// util: debug
var logger = {};

logger.debug = function(message){
	console.log(message);
};
logger.status = function(message){
	console.log("STATUS: " + message);
};
logger.output = function(name, output){
	console.log(name + ": " + JSON.stringify(output));
};
logger.alert = function(message){
	alert("WARNING! " + message);
};
