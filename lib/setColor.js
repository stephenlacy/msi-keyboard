var constants = require('./constants');
var setMode = require('./setMode');

module.exports = function(keyboard, region, color, intensity){
	if (!region) throw 'missing region';
	if (!color) throw 'missing color';
	if (!intensity) intensity = 'high';

	if (typeof constants.regions[region] === 'undefined') throw 'invalid region';
	if (typeof constants.levels[intensity] === 'undefined') throw 'invalid intensity';
	if (typeof constants.colors[color] === 'undefined') throw 'invalid color';

	var activate = new Buffer(8);
	// header
	activate[0] = 1;
	activate[1] = 2;
	activate[2] = 66; // set color
	activate[3] = constants.regions[region];
	activate[4] = constants.colors[color];
	activate[5] = constants.levels[intensity];
	activate[6] = 0;
	activate[7] = 236;  // EOR (end of request)

	keyboard.sendFeatureReport(activate);
	setMode(keyboard, keyboard.currentMode || 'normal');

	keyboard.current[region] = {
		intensity: intensity,
		color: color
	};
	return keyboard;
};
