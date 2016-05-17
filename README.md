# MSI Keyboard LED Controller

OS independent* LED Controller for MSI Steelseries laptop keyboards Using Node.js

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

![keyboard](https://i.cloudup.com/V7zz0ZdHT8.png)

## Usage

Make sure you have the needed usb lib requirements for your OS.


Generic Linux: `libusb-dev` `libusb-1.0-0-dev`

#### Use it as command line :
https://github.com/Kwaadpepper/msi-keyboard-CLI

#### if using as a stand alone module:

`npm install`

###Note:
Linux and *nix systems may require sudo to access the hid device interface.

*Not tested on all platforms.
Platform tests appreciated


```javascript
// require the LED module
var keyboard = require('msi-keyboard')();

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
keyboard.mode('breathe', 'green');


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
`keyboard.colors(String region, String Color);`

Colors must be set before using keyboard.blink();

They will not affect hardware-default modes such as Wave and Breathing.

The following colors are defined:

	black
	red
	orange
	yellow
	green
	cyan
	blue
	purple
	white

To set a color use keyboard.colors() There are two ways to set the color to a region:
```javascript
keyboard.color('middle', 'green');
keyboard.color('middle', {color:'green', intensity:'high'});
```


## Intensity
`keyboard.colors(String region, {String color, String intensity});`

The color intensity to white can be set via keyboard.colors();

The following intensities are used:

    light
    low
    med
    high

To set it:

```javascript
keyboard.color('right', {
    color: 'blue',
	intensity: 'med',  // light, low, med, high
});
```

##Modes
`keyboard.mode(String mode, String primaryColor, String secondaryColor);`
`keyboard.mode(String mode, Object left, Object middle, Object right, Integer cyclePeriod);`

MSI Steelseries keyboards have built modes.

Breathe and Wave modes support fading between colors, which can be set when calling the keyboard.mode() method.

Passing in only one color argument defaults the secondaryColor to 'black':

`keyboard.mode(String mode, String primaryColor);`

You can also set each region's color individually:

`keyboard.mode(String mode, String leftPrimary, String middlePrimary, String rightPrimary, Integer cyclePeriod);`

`keyboard.mode(String mode, Object left, Object middle, Object right, Integer cyclePeriod);`

Region objects are defined as such:

    right: {
      primary: {
        color: 'red',
        intensity: 'high'
      },
      secondary: {
        color: 'blue',
        intensity: 'high'
      }
    }

Which is equivalent to:

    right: {
      color: 'red',
      intensity: 'high',
      secondary: {
        color: 'blue',
        intensity: 'high'
      }
    }


You can also define just the primary and secondary colors, leaving the intensities to their default (high):

    right: {
      primary: 'red',
      secondary: 'blue'
    }

If you specify the color and intensity directly in the Region object, you can set just one of the secondary fields and the other will take the default from the primary (secondary color will be red with light intensity):

    right: {
      color: 'red',
      intensity: 'high',
      secondary: {intensity:'light'}
    }

The cyclePeriod defaults to 2 seconds when not passed in.

The modes defined by the hardware are:

    Normal
    Gaming
    Breathe
    Demo
    Wave


Usage:

```javascript

keyboard.mode('breathe', 'green', 'red', 'yellow');

```


##Regions
`keyboard.colors(String region, String color);`

There are three regions on the Steelseries keyboard:

    Left
    Middle
    Right

Each can have a color and intensity set.



##Blink
`keyboard.blink(Time milliseconds);`

The time is the speed in which the keyboard is to blink.

keyboard.colors(); Must be set before using keyboard.blink();

Usage:

```javascript
// keyboard.color(...);


keyboard.blink(750);
```

To blink one, or two regions only:

```javascript
// keyboard.color(...);


keyboard.blink(['left','right'], 750);
```



## Examples

You can view more examples in the [example folder.](https://github.com/wearefractal/msi-keyboard/tree/master/examples)

### Confirmed Systems

```sh
OS: Debain 8
Kernel: Linux 4.4.0 AMD
Node: v5 / v6
libusb-dev: v0.1.12

---

OS: Arch Linux
Kernel: 4.5.1-1-ARCH
Node: v6.0.0
libusb v0.1.12

```

## LICENSE

(MIT License)

Copyright (c) 2013 | Steve Lacy slacy.me | Fractal wearefractal.com <contact@wearefractal.com>

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
