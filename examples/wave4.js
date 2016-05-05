var keyboard = require('../')();

keyboard.mode('wave', {
	left: {color:'blue',secondary:'red'},
	middle: {color:'blue', secondary:'red'},
	right: {color:'blue', secondary:'red'},
}, 2);
