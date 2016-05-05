var keyboard = require('../')();

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


keyboard.blink(750);
