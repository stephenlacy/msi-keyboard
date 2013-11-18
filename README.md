[![Build Status](https://travis-ci.org/wearefractal/msi-keyboard.png?branch=master)](https://travis-ci.org/wearefractal/msi-keyboard)

[![NPM version](https://badge.fury.io/js/msi-keyboard.png)](http://badge.fury.io/js/msi-keyboard)

## Information

<table>
<tr> 
<td>Package</td><td>msi-keyboard</td>
</tr>
<tr>
<td>Description</td>
<td>MSI Keyboard LED Controller</td>
</tr>
<tr>
<td>Hardware</td>
<td>MSI GE, GT Steelseries Keyboard</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 0.4</td>
</tr>
</table>

## Usage

```javascript
// require the LED module
var keyboard = require('msi-keyboard');

// Set left region to high intensity, color red
keyboard.color('left', {
	color: 'red',
	intensity: 'high'
});

// Set middle region to green default high intensity
keyboard.color('middle', 'green');


// Set right region to blue with light intensity
keyboard.color('right', {
	color: 'blue',
	intensity: 'light',
});


// Hardware modes
// Setting .color() will Not affect the hardware defined colors for modes

// Set Hardware mode to breath
keyboard.mode('breathe');


// Blinking
// Set the keyboard.color() Before calling .blink()
// Refer to examples/blinkMulti.js

// Blink all the keyboard LEDs to 750ms
keyboard.blink(750);


// Blink Only left and right regions at 750ms
keyboard.blink(['left','right'], 750);


// Use the default blink, time: 1000ms
keyboard.blink();


// Stop the blink after 5000ms
setTimeout(keyboard.stopBlink, 5000);

```



## Colors
Colors are set




## Examples

You can view more examples in the [example folder.](https://github.com/wearefractal/msi-keyboard/tree/master/examples)

## LICENSE

(MIT License)

Copyright (c) 2013 Steve Lacy |  Fractal <contact@wearefractal.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
