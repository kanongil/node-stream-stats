var util = require('util'),
    assert = require('assert');

try {
  var Writable = require('stream').Writable;
  assert(Writable);
} catch (e) {
  var Writable = require('readable-stream/writable');
}

module.exports = StreamStats;

function StreamStats(options) {
  if (!(this instanceof StreamStats))
    return new StreamStats(options);

  this.totalBytes = 0;

  Writable.call(this, options);
}
util.inherits(StreamStats, Writable);

StreamStats.prototype._write = function(chunk, cb) {
  this.totalBytes += chunk.length;
  cb();
}
