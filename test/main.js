var keyboard = require('../')();
var should = require('should');
require('mocha');

describe('msi-keyboard', function() {
  it('should export a keyboard', function(done) {
    should.exist(keyboard);
    keyboard.close();
    done();
  });
});
