var keyboard = require('../')();

keyboard.mode('wave', {
	left: {color:'green',secondary:'blue'},
	middle: {color:'blue', secondary:'green'},
	right: {color:'green', secondary:'blue'}
}, 2);
