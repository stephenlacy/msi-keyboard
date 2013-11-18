var constants = require('./constants');

module.exports = function(keyboard, mode){
	if (!mode) mode = "normal";
	if (typeof constants.modes[mode] === 'undefined') throw "invalid mode";

	var commit = new Buffer(8);
	commit[0] = 1;
	commit[1] = 2;
	commit[2] = 65; // commit
	commit[3] = constants.modes[mode]; // set hardware mode
	commit[4] = 0;
	commit[5] = 0;
	commit[6] = 0;
	commit[7] = 236; // EOR

	keyboard.sendFeatureReport(commit);
	keyboard.currentMode = mode;
	return keyboard;
};

