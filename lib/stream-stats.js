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

  this.reset();

  Writable.call(this, options);
}
util.inherits(StreamStats, Writable);

StreamStats.prototype._write = function(chunk, encoding, cb) {
  // temporary to support old variants of readable-stream
  if (typeof encoding === 'function')
    cb = encoding;

  this.totalBytes += chunk.length;
  cb();
}

StreamStats.prototype.reset = function() {
  this.totalBytes = 0;
}