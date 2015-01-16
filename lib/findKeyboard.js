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
	board.mode = function(mode){
		setMode(board, mode);
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
