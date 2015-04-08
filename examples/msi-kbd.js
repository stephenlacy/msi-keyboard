// msi-kbd - Change color settings of MSI laptop keyboards 
// (try 'msi-kbd --help' for options and settings or see Usage())
//
// Hal Pomeranz (hal@deer-run.com), Deer Run Associates, 2015-04-08
// This code released under Creative Commons Attribution license (CC BY)

var colors = ['off', 
	      'red', 
	      'orange', 
	      'yellow', 
	      'green', 
              'sky', 
	      'blue', 
	      'purple', 
	      'white'];

var intensities = ['light', 'low', 'med', 'high'];

var modes = ['normal', 'gaming', 'breathe', 'demo', 'wave'];

var argv = require('minimist')(process.argv.slice(2), 
			       {string: 'ClmrM'.split(''), unknown: Usage});
var keyboard = require('msi-keyboard');

if (argv['C']) {
  LightKbd('left', argv['C']);
  LightKbd('middle', argv['C']);
  LightKbd('right', argv['C']);
}

if (argv['l']) {
  LightKbd('left', argv['l']);
}

if (argv['m']) {
  LightKbd('middle', argv['m']);
}

if (argv['r']) {
  LightKbd('right', argv['r']);
}

if (argv['M']) {
  if (modes.indexOf(argv['M'].toLowerCase()) > -1) {
    keyboard.mode(argv['M']);
  }
  else {
    Usage('Unrecognized mode ' + argv['M']);
  }
}


function LightKbd(region, colorstr) {
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
      Usage('Unrecognized color spec ' + colorargs[i] + ' for ' + region + ' region');
    }
  }

  if (!colorSet.length) {
    Usage('You must specify a color for ' + region + ' region');
  }

  keyboard.color(region, {color:colorSet, intensity:intenSet});
}


function Usage(msg) {
  if (msg.indexOf('-') !== 0) {
    process.stderr.write(msg + '\n');
  }
  process.stderr.write('Usage: msi-kbd [-C colorspec | -l colorspec -m colorspec -r colorspec] [-M mode]\n');
  process.stderr.write('   Colorspec should be color[:intensity]\n');
  process.stderr.write('      Valid colors: black,none,' + colors + '\n');
  process.stderr.write('      Valid intensities: ' + intensities + '\n');
  process.stderr.write('   Valid modes: ' + modes + '\n');
  process.exit(1);
}
