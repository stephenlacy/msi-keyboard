var findKeyboard = require('../lib/findKeyboard');
var setColor = require('../lib/setColor');
var should = require('should');
require('mocha');

describe('msi-keyboard', function() {
  describe('setColor()', function() {
    it('should set the color', function(done) {
    	var keyboard = findKeyboard();
    	setColor(keyboard, 'left', 'green', 'high');
    	setColor(keyboard, 'right', 'red', 'high');
    	setColor(keyboard, 'middle', 'blue', 'high');
      keyboard.close();
      done();
    });
  });
});
