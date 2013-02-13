var util = require('util'),
    assert = require('assert');

var Writable = require('stream').Writable;

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
