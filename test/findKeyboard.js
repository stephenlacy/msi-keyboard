var findKeyboard = require('../lib/findKeyboard');
var should = require('should');
require('mocha');

describe('msi-keyboard', function() {
  describe('findKeyboard()', function() {
    it('should find the keyboard', function(done) {
    	var keyboard = findKeyboard();
      should.exist(keyboard);
      should.exist(keyboard.write);
      keyboard.close();
      done();
    });
  });
});
