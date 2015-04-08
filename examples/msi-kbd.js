#!/usr/bin/nodejs

// msi-kbd - Change color settings of MSI laptop keyboards 
// (try "msi-kbd --help" for options and settings or see usage())
//
// Hal Pomeranz (hal@deer-run.com), Deer Run Associates, 2015-04-08
// This code released under Creative Commons Attribution license (CC BY)


var colors = ["off", "red", "orange", "yellow", "green", 
              "sky", "blue", "purple", "white"];

var intensities = ["light", "low", "med", "high"];

var modes = ["normal", "gaming", "breathe", "demo", "wave"];

var argv = require('minimist')(process.argv.slice(2), {string: 'ClmrM'.split(''), unknown: usage});
var keyboard = require('msi-keyboard');

if (argv['C']) {
    lightKbd('left', argv['C']);
    lightKbd('middle', argv['C']);
    lightKbd('right', argv['C']);
}

if (argv['l']) {
    lightKbd('left', argv['l']);
}

if (argv['m']) {
    lightKbd('middle', argv['m']);
}

if (argv['r']) {
    lightKbd('right', argv['r']);
}

if (argv['M']) {
    if (modes.indexOf(argv['M'].toLowerCase()) > -1) {
	keyboard.mode(argv['M']);
    }
    else {
	usage('Unrecognized mode ' + argv['M']);
    }
}


function lightKbd(region, colorstr) {
    colorstr = colorstr.toLowerCase();

    var colorSet = '';
    var intenSet = 'high';
    var colorargs = colorstr.split(':');

    for (i = 0; i < colorargs.length; i++) {
	if (colorargs[i] === 'black' || colorargs[i] === 'none') {
	    colorargs[i] = 'off';
	}
	if (colors.indexOf(colorargs[i]) > -1) {
	    colorSet = colorargs[i];
	}
	else if (intensities.indexOf(colorargs[i]) > -1) {
	    intenSet = colorargs[i];
	}
	else {
	    usage('Unrecognized color spec ' + colorargs[i] + ' for ' + region + ' region');
	}
    }

    if (!colorSet.length) {
	usage('You must specify a color for ' + region + ' region');
    }

    keyboard.color(region, {color:colorSet, intensity:intenSet});
}


function usage(msg) {
    if (msg.indexOf('-') != 0) {
	process.stderr.write(msg + '\n');
    }
    process.stderr.write('Usage: msi-kbd [-C colorspec | -l colorspec -m colorspec -r colorspec] [-M mode]\n');
    process.stderr.write('   Colorspec should be color[:intensity]\n');
    process.stderr.write('      Valid colors: black,none,' + colors + '\n');
    process.stderr.write('      Valid intensities: ' + intensities + '\n');
    process.stderr.write('   Valid modes: ' + modes + '\n');
    process.exit(1);
}

