var keyboard = require('../')();

keyboard.mode('breathe', 'green', 'red', 'yellow'); //Keyboard will pulse from green, red, and yellow (in the left, middle, and right areas, respectively) high intensity to black (which is the default secondary color).

/*
keyboard.mode('breathe',
  {color:'sky', intensity:'high', secondary:'purple'}, //Left area will alternate from sky to purple, with high light intensity
  {color:'red', intensity:'high', secondary:{intensity:'light'}}, //Middle area will alternate from dark red (high intensity red) to a light pink (light intensity red)
  {primary:{color:'green'},secondary:{color:'black'}}, //Right area will alternate from green (high intensity by default) to darkness (black)
  1); //Pattern will repeat every 1 second
  */
