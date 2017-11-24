var constants = require('./constants');
var setMode = require('./setMode');

module.exports = function(keyboard, region, color, intensity){
	if (!region) throw 'missing region';
	if (!color) throw 'missing color';
	if (!intensity) intensity = 'high';

	if (typeof constants.regions[region] === 'undefined') throw 'invalid region';
	if (typeof constants.levels[intensity] === 'undefined') throw 'invalid intensity';
	if (   (typeof color.red === 'undefined')
			|| (typeof color.green === 'undefined')
			|| (typeof color.blue === 'undefined')
	) throw 'invalid color';

	var activate = [];
	// header
	activate[0] = 1;
	activate[1] = 2;
	activate[2] = 64; // set color
	activate[3] = constants.regions[region];
	activate[4] = color.red() * constants.levels[intensity];
	activate[5] = color.green() * constants.levels[intensity];
	activate[6] = color.blue() * constants.levels[intensity];
	activate[7] = 0;

	keyboard.sendFeatureReport(activate);
	setMode(keyboard, keyboard.currentMode || 'normal');

	keyboard.current[region] = {
		intensity: intensity,
		color: color
	};

	return keyboard;
};
