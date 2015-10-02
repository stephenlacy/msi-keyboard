var hid = require('node-hid');
var setColor = require('./setColor');
var setMode = require('./setMode');
var constants = require('./constants');

module.exports = function(){
	var board = new hid.HID(6000, 65280);
	board.current = {};

	board.color = function(region, obj){
		if (typeof obj === 'string') obj = {color:obj};
		setColor(board, region, obj.color, obj.intensity);
		return board;
	};
	board.mode = function(mode, left, middle, right, period){
    if (arguments.length == 2) { //One color paramter; set it as the primary color for all areas, leavings secondary off
      left = left;
      middle = left;
      right = left;
    } else if (arguments.length == 3) { //Two color parameters; set them as the primary and secondary colors for all areas.
      if ((typeof left === 'string' || typeof left === 'number') && (typeof middle === 'string' || typeof middle === 'number')) {
        var primary = left;
        var secondary = middle;
        
        left = {primary: primary, secondary: secondary};
        middle = {primary: primary, secondary: secondary};
        right = {primary: primary, secondary: secondary};
      }
    }
    
		setMode(board, mode, left, middle, right, period);
		return board;
	};
	board.blink = function(regions, time){
		if (!Array.isArray(regions)) {
			time = regions;
			regions = Object.keys(constants.regions);
		}
		if (typeof time === 'undefined') time = 1000;
		board._blinks = {};

		regions.forEach(function(region){
			var startColor = board.current[region];
			if (!startColor) return;


			var interval = setInterval(function(){
				board.blinkRegion(region, startColor, time/2);
			}, time);

			board._blinks[region] = {
				interval: interval,
				color: startColor
			};
		});
		return board;
	};

	board.stopBlink = function(){
		Object.keys(board._blinks).forEach(function(region){
			var blink = board._blinks[region];
			clearInterval(blink.interval);
			board.color(region, blink.color);
		});
		return board;
	};

	board.blinkRegion = function(region, color, time) {
		board.color(region, 'off');

		setTimeout(function(){
			board.color(region, color);
		}, time);

		return board;
	};

	return board;
}
