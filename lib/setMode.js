var constants = require ('./constants');

module.exports = function (keyboard, mode, regions, period){
	if (!mode) mode = 'normal';
	if (typeof constants.modes[mode] === 'undefined') throw 'invalid mode';

  if (mode == 'wave' || mode == 'breathe') {
    if (period === undefined || typeof period !== 'number') {
      period = 2;
    }

    if (typeof regions === 'undefined')
      regions = 'blue';

    if (typeof regions !== 'object')
      regions = { left: regions, middle: regions, right: regions };

    /*
     * NOTES about period valies:
     * The period paramaters are how long (in seconds?) it will take each of the RGB
     * components of each keyboard area to complete a cycle. Setting them different
     * from each other creates an interesting effect, but not something I want to
     * support at the moment.
     * The total time to change the color of the area is the longest of the three period
     * values for an area.
     *
     * In breathe mode (area colors changing in parallel), the duration of the breathe
     * loop is the longest period of all three areas.
     * Each area will reach the peak of its primary and secondary colors in sync.
     * If one area is set to be much quicker than the others, you will see it turn
     * its primary color quickly and stay fully lit while the other two catch up,
     * then the quick area will quickly change to the secondary color and stay solid
     * ntil the other two catch up again, and so on.
     *
     * In wave mode (area colors changing in sequence), the duration of the wave loop
     * is the sum of the longest period in each area.
     * The keyboard will start with each area in its secondary color. The left area
     * will begin changing first, taking (period/2) seconds to reach full primary color.
     * At that point, it will start to fade back to its secondary color while the middle
     * section begins its transition to its primary color. This continues left-to-right
     * across the keyboard, and then starts over with the left fading to primary as the
     * right side fade back to secondary.
     * If you don't sync up the total period duration for each of the areas, some areas
     * will change faster than others. If the left area hasn't yet reached its peak
     * secondary color by time the right side hits its primary peak (signally the left
     * area's turn to fade to primary), the hardware realizes it has fallen behind and
     * stops the wave until the user issues the comand again.
     */

    var _regions = ['left', 'middle', 'right'];
    var Def = null;
    for(var k in _regions) {
      var _k = parseInt(k) *3;
      if (typeof regions[_regions[k]] !== 'undefined') {
        Def = getSettingsForRegion (regions[_regions[k]], _regions[k]);
        sendData (keyboard, _k + 1, Def.primary.color, Def.primary.level, 0);
        sendData (keyboard, _k + 2, Def.secondary.color, Def.secondary.level, 0);
        sendData (keyboard, _k + 3, period, period, period);
      } else {
        sendData (keyboard, _k + 1, 'black', 0, 0);
        sendData (keyboard, _k + 2, 'black', 0, 0);
        sendData (keyboard, _k + 3, period, period, period);
      }
    }
  }

  //Initalize the mode
  commit (keyboard, constants.modes[mode]);

  //Save the mode for reference
  keyboard.currentMode = mode;

	return keyboard;
};

function getSettingsForRegion (data, region) {
  var regionDef = null;

  switch (typeof data) {

    case 'string':
      if (typeof constants.colors[data] === 'undefined')
        throw 'invalid color for ' + region + ' region';

      regionDef = {
        primary: {color: constants.colors[data], level: 0},
        secondary: {color: constants.colors['black'], level: 0}
      };
      break;

    case 'number':
      if (data < 0 || data >= constants.colors.length)
        throw 'invalid color for ' + region + ' region';

      regionDef = {
        primary: {color: data, level: 0},
        secondary: {color: constants.colors['black'], level: 0}
      };

    case 'object':
      if (data.primary)
        regionDef = {primary: getColorIntensityLevel (data.primary, region, true)};
      else
        regionDef = {primary: getColorIntensityLevel (data, region, true)};

      if (data.secondary) {

        regionDef.secondary = getColorIntensityLevel (data.secondary, region);

        //Default to black if both settings are unset
        if (regionDef.secondary.color < 0 && regionDef.secondary.level < 0)
          regionDef.secondary = {color: constants.colors['black'], level: 0};

        //Default to primary settings if either are unset
        if (regionDef.secondary.color < 0)
          regionDef.secondary.color = regionDef.primary.color;

        if (regionDef.secondary.level < 0)
          regionDef.secondary.level = regionDef.primary.level;

      } else {
        //Default secondary to black if unset
        regionDef.secondary = {color: constants.colors['black'], level: 0};
      }
      break;

    default:
      throw 'invalid color for ' + region + ' region';
      break;
  }

  return regionDef;
}

function getColorIntensityLevel (data, region, isRequired) {
  var colorName, levelName;
  var colorId = -1, levelId = -1;

  switch (typeof data) {

    case 'string':
      colorName = data;
      break;

    case 'number':
      colorId = data;
      break;

    default:
      if (typeof data.color === 'string')
        colorName = data.color;
      else if (typeof data.color === 'number')
        colorId = data.color;
      break;
  }

  if (colorName) {
    if (typeof constants.colors[colorName] === 'undefined')
      throw 'invalid color for ' + region + ' region';
    colorId = constants.colors[colorName];
  }

  //Always invalid if color is above range. colorId < 0 should be allowed if the fields are not required
  if (colorId >= constants.colors.length || (isRequired && colorId < 0))
    throw 'invalid color for ' + region + ' region';

  if (data.intensity) {
    if (typeof data.intensity === 'string')
      levelName = data.intensity;
    else if (typeof data.intensity === 'number')
      levelId = data.intensity;
  }

  if (levelName) {
    if (typeof constants.levels[levelName] === 'undefined')
      throw 'invalid intensity for ' + region + ' region';
    levelId = constants.levels[levelName];
  }

  if (levelId >= constants.colors.length)
    throw 'invalid intensity for ' + region + ' region';

  if (isRequired && levelId < 0)
    levelId = 0;

  colorDef = {color: colorId, level: levelId};

  return colorDef;
}

function sendData (keyboard, val1, val2, val3, val4) {
    var data = [];

    data[0] = 1;
    data[1] = 2;
    data[2] = 67;
    data[3] = val1;
    data[4] = val2;
    data[5] = val3;
    data[6] = val4;
    data[7] = 236;

    keyboard.sendFeatureReport (data);
}

function commit (keyboard, mode) {
    var data = [];

    data[0] = 1;
    data[1] = 2;
    data[2] = 65;
    data[3] = mode;
    data[4] = 0;
    data[5] = 0;
    data[6] = 0;
    data[7] = 236;

    keyboard.sendFeatureReport (data);
}
