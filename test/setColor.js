var findKeyboard = require('../lib/findKeyboard');
var setColor = require('../lib/setColor');
require('mocha');

describe('msi-keyboard', function() {
  describe('setColor()', function() {
    it('should set the color', function(done) {
      var keyboard = findKeyboard();
      setColor(keyboard, 'left', { red: () => 255, green: () => 0, blue: () => 0 }, 'high');
      setColor(keyboard, 'right', { red: () => 0, green: () => 255, blue: () => 0 }, 'high');
      setColor(keyboard, 'middle', { red: () => 0, green: () => 0, blue: () => 255 }, 'high');
      keyboard.close();
      done();
    });
  });
});
