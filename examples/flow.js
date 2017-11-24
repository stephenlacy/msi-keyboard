var keyboard = require('../')();
var color = require('color');
var sleep = require('sleep');



var left = color({h: 0, s: 255, v: 255});
var middle = color({h: 60, s: 255, v: 255});
var right = color({h: 120, s: 255, v: 255});



while(true){

    sleep.msleep(10);

    keyboard.color('left', {
	    color: left,
	    intensity: 'high'
    });

    keyboard.color('logo', {
	    color: left,
	    intensity: 'high'
    });

    keyboard.color('frontLeft', {
	    color: left,
	    intensity: 'high'
    });

    keyboard.color('middle', {
	    color: middle,
	    intensity: 'high'
    });

    keyboard.color('touchpad', {
	    color: middle,
	    intensity: 'high'
    });


    keyboard.color('right', {
	    color: right,
	    intensity: 'high'
    });

    keyboard.color('frontRight', {
	    color: right,
	    intensity: 'high'
    });



    left = left.rotate(1);
    middle = middle.rotate(1);
    right = right.rotate(1);

}


