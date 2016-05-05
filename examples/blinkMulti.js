var keyboard = require('../')();

// Set colors before calling blink()
keyboard.color('left', {
	color: 'red',
	intensity: 'med'
});
keyboard.color('middle', {
	color: 'green',
	intensity: 'med'
});
keyboard.color('right', {
	color: 'blue',
	intensity: 'med',
});


keyboard.blink(['left','right'], 750);
