var keyboard = require('../')();

keyboard.mode('breathe', {
    left: {color: 'red', intensity: 'med'},
    middle :{color:'green', intensity:'med'},
    right: {color:'green', intensity:'med'}
});



keyboard.blink(['left'], 750);

setTimeout(keyboard.stopBlink, 5000);

