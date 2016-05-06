// msi-kbd - Change color settings of MSI laptop keyboards
// (try 'msi-kbd --help' for options and settings or see Usage())
//
// Hal Pomeranz (hal@deer-run.com), Deer Run Associates, 2015-04-08
// This code released under Creative Commons Attribution license (CC BY)

var keyboard = require('msi-keyboard')();
var argv = require('minimist')(process.argv.slice(2), {
  string: 'clmrM'.split(''),
  unknown: Usage
});

var colors = [
  'black',
  'red',
  'orange',
  'yellow',
  'green',
  'cyan',
  'blue',
  'purple',
  'white'
];
var intensities = ['light', 'low', 'med', 'high'];
var modes = ['normal', 'gaming', 'breathe', 'demo', 'wave'];

if (Object.keys(argv).length < 2) {
  return Usage();
}

if (argv.c) {
  LightKbd('left', argv.c);
  LightKbd('middle', argv.c);
  LightKbd('right', argv.c);
}

if (argv.l) {
  LightKbd('left', argv.l);
}

if (argv.m) {
  LightKbd('middle', argv.m);
}

if (argv.r) {
  LightKbd('right', argv.r);
}

if (argv.M) {
  if (modes.indexOf(argv.M.toLowerCase()) > -1) {
    keyboard.mode(argv.M);
  }
  else {
    Usage('Unrecognized mode ' + argv.M);
  }
}

function LightKbd(region, colorstr) {
  colorstr = colorstr.toLowerCase();

  var colorSet = '';
  var intenSet = 'high';
  var colorargs = colorstr.split(':');

  for (i = 0; i < colorargs.length; i++) {
    if (colorargs[i] === 'none') {
      colorargs[i] = 'black';
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
    return Usage('You must specify a color for ' + region + ' region');
  }

  keyboard.color(region, {color:colorSet, intensity:intenSet});
}


function Usage(msg) {
  if (msg.indexOf('-') !== 0) {
    process.stderr.write(msg + '\n');
  }
  process.stderr.write('Usage: msi-kbd [-C colorspec | -l colorspec -m colorspec -r colorspec] [-M mode]\n');
  process.stderr.write('   Colorspec should be color:intensity\n');
  process.stderr.write('      Valid colors: ' + colors.join(', ') + '\n');
  process.stderr.write('      Valid intensities: ' + intensities.join(', ') + '\n');
  process.stderr.write('   Valid modes: ' + modes.join(', ') + '\n');
  process.stderr.write('sudo node msi-kbd.js -C blue -l green -r red:high' + '\n');
  process.exit(1);
}
