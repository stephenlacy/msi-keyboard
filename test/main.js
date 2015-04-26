var should = require('should');
require('mocha');

describe('msi-keyboard', function() {
  it('should export a keyboard', function(done) {
    var keyboard = require('../');
    should.exist(keyboard);
    keyboard.close();
    done();
  });
});
