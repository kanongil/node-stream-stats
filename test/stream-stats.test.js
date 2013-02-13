var assert = require('assert'),
    Readable = require('stream').Readable;

var StreamStats = require('../lib/stream-stats');

describe('StreamStats', function() {
  
  it('should self-allocate', function() {
    assert(StreamStats() instanceof StreamStats);
  })

  it('should record total throughput', function(done) {
    var r = new Readable();
    var s = new StreamStats();

    r.pipe(s);
    r.push(new Buffer(5));
    r.push(new Buffer(8));
    r.push(null);

    s.on('finish', function() {
      assert.equal(s.totalBytes, 13);
      done();
    });
  })

})