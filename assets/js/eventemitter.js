var EventEmitter = function(obj) {
  obj._events = {};
  ["emit", "on", "once", "off"].forEach(function(n) {
    obj[n] = EventEmitter.prototype[n];
  });
};

EventEmitter.prototype.emit = function() {
  var args = Array.prototype.slice.call(arguments);
  var name = args.shift();
  var cb   = this._events[name];

  if (cb) {
    cb.forEach(function(i) {
      i.apply(this, args);
    }.bind(this));
  } else if (name == "error") {
    console.log('[EventEmitter]', this, args);
  }

  return this;
};

EventEmitter.prototype.off = function(name, cb) {
  if (this._events[name]) {
    if (cb) {
      this._events[name] = this._events[name].filter(function(i) {
        return i != cb;
      });
    } else {
      delete this._events[name];
    }
  }
  return this;
};

EventEmitter.prototype.on = function(name, cb) {
  if (!name || !cb) throw "Usage: EventEmitter.on(name, cb)";
  if (!this._events[name])
    this._events[name] = [];
  this._events[name].push(cb);
  return this;
};

EventEmitter.prototype.once = function(name, cb) {
  var wrapper = function() {
    this.off(name, wrapper);
    cb.apply(this, arguments);
  }.bind(this);
  this.on(name, wrapper);
};
