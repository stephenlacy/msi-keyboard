var constants = require('./constants');

module.exports = function(keyboard, mode, left, middle, right, period){
	if (!mode) mode = 'normal';
	if (typeof constants.modes[mode] === 'undefined') throw 'invalid mode';
  
  if (mode == 'wave' || mode == 'breathe') {
    if (period === undefined) {
      period = 2;
    }
    
    var leftDef = getPrimaryAndSecondarySettingsForRegion(left, "left");
    var middleDef = getPrimaryAndSecondarySettingsForRegion(middle, "middle");
    var rightDef = getPrimaryAndSecondarySettingsForRegion(right, "right");
    
    /* 
     * NOTES about period valies:
     * The period paramaters are how long (in seconds?) it will take each of the RGB components of each keyboard area to complete a cycle. Setting them different from each other creates an interesting effect, but not something I want to support at the moment.
     * The total time to change the color of the area is the longest of the three period values for an area.
     * 
     * In breathe mode (area colors changing in parallel), the duration of the breathe loop is the longest period of all three areas.
     * Each area will reach the peak of its primary and secondary colors in sync. If one area is set to be much quicker than the others, you will see it turn its primary color quickly and stay fully lit while the other two catch up, then the quick area will quickly change to the secondary color and stay solid until the other two catch up again, and so on.
     * 
     * In wave mode (area colors changing in sequence), the duration of the wave loop is the sum of the longest period in each area.
     * The keyboard will start with each area in its secondary color. The left area will begin changing first, taking (period/2) seconds to reach full primary color. At that point, it will start to fade back to its secondary color while the middle section begins its transition to its primary color. This continues left-to-right across the keyboard, and then starts over with the left fading to primary as the right side fade back to secondary.
     * If you don't sync up the total period duration for each of the areas, some areas will change faster than others. If the left area hasn't yet reached its peak secondary color by time the right side hits its primary peak (signally the left area's turn to fade to primary), the hardware realizes it has fallen behind and stops the wave until the user issues the comand again.
     */
    
    //Send color data for left side
    sendData(keyboard, 1, leftDef.primary.color, leftDef.primary.level, 0);
    sendData(keyboard, 2, leftDef.secondary.color, leftDef.secondary.level, 0);
    sendData(keyboard, 3, period, period, period);

    //Send color data for middle
    sendData(keyboard, 4, middleDef.primary.color, middleDef.primary.level, 0);
    sendData(keyboard, 5, middleDef.secondary.color, middleDef.secondary.level, 0);
    sendData(keyboard, 6, period, period, period);

    //Send color data for right side
    sendData(keyboard, 7, rightDef.primary.color, rightDef.primary.level, 0);
    sendData(keyboard, 8, rightDef.secondary.color, rightDef.secondary.level, 0);
    sendData(keyboard, 9, period, period, period);
  }
  
  //Initalize the mode
  commit(keyboard, constants.modes[mode]);
  
  //Save the mode for reference
  keyboard.currentMode = mode;
  
	return keyboard;
};

function getPrimaryAndSecondarySettingsForRegion(data, region) {
  if (typeof data === 'string') {
    if(typeof constants.colors[data] === 'undefined') throw 'invalid color for ' + region + ' region';
    regionDef = {primary: {color: constants.colors[data], level: 0}, secondary: {color: constants.colors['off'], level: 0}};
  } else if (typeof data === 'number') {
    if(data < 0 || data >= constants.colors.length) throw 'invalid color for ' + region + ' region';
    regionDef = {primary: {color: data, level: 0}, secondary: {color: constants.colors['off'], level: 0}};
  } else if (typeof data === 'object') {
    if (data.primary) {
      regionDef = {primary: getColorAndIntensityLevel(data.primary, region, true)};
    } else {
      regionDef = {primary: getColorAndIntensityLevel(data, region, true)};
    }
    if (data.secondary) {
      regionDef.secondary = getColorAndIntensityLevel(data.secondary, region);
      //Default to off if both settings are unset
      if (regionDef.secondary.color < 0 && regionDef.secondary.level < 0) regionDef.secondary = {color: constants.colors['off'], level: 0};
      //Default to primary settings if either are unset
      if (regionDef.secondary.color < 0) regionDef.secondary.color = regionDef.primary.color;
      if (regionDef.secondary.level < 0) regionDef.secondary.level = regionDef.primary.level;
    } else {
      //Default secondary to off if unset
      regionDef.secondary = {color: constants.colors['off'], level: 0};
    }
  } else 'invalid color for ' + region + ' region';
  
  return regionDef;
}

function getColorAndIntensityLevel(data, region, isRequired) {
  var colorName, levelName;
  var colorId = -1, levelId = -1;
  
  if (typeof data === 'string') {
    colorName = data;
  } else if (typeof data === 'number') {
    colorId = data;
  } else if (data.color) {
    if (typeof data.color === 'string') {
      colorName = data.color;
    } else if (typeof data.color === 'number') {
      colorId = data.color;
    }
  }
  
  if (colorName) {
    if (typeof constants.colors[colorName] === 'undefined') throw 'invalid color for ' + region + ' region';
    colorId = constants.colors[colorName];
  }
  
  //Always invalid if color is above range. colorId < 0 should be allowed if the fields are not required
  if(colorId >= constants.colors.length || (isRequired && colorId < 0)) throw 'invalid color for ' + region + ' region';
    
  
  if (data.intensity) {
    if (typeof data.intensity === 'string') {
      levelName = data.intensity;
    } else if (typeof data.intensity === 'number') {
      levelId = data.intensity;
    }
  }
  
  if (levelName) {
    if (typeof constants.levels[levelName] === 'undefined') throw 'invalid intensity for ' + region + ' region';
    levelId = constants.levels[levelName];
  }

  if (levelId >= constants.colors.length) throw 'invalid intensity for ' + region + ' region';
    
  if (isRequired && levelId < 0) {
    levelId = 0;
  }

  colorDef = {color: colorId, level: levelId};
  
  return colorDef;
}

function sendData(keyboard, val1, val2, val3, val4) {
    var data = new Buffer(8);

    data[0] = 0x01;
    data[1] = 0x02;
    data[2] = 0x43;
    data[3] = val1;
    data[4] = val2;
    data[5] = val3;
    data[6] = val4;
    data[7] = 0xec;

    keyboard.sendFeatureReport(data);
}

function commit(keyboard, mode) {
    var data = new Buffer(8);

    data[0] = 0x01;
    data[1] = 0x02;
    data[2] = 0x41;
    data[3] = mode;
    data[4] = 0x00;
    data[5] = 0x00;
    data[6] = 0x00;
    data[7] = 0xec;

    keyboard.sendFeatureReport(data);
}