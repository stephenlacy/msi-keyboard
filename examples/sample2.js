var keyboard = require('../')();

keyboard.mode('breathe', {
  left: {
    color: 'red',
    intensity: 'high',
    secondary:'green'
  },
  right: {
    color:'green',
    intensity:'med'
  }
});


keyboard.blink(['left'], 200);

setTimeout(keyboard.stopBlink, 500);

