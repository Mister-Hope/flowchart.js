export const merge = (options, defaultOptions) => {
  if (!options || typeof options === "function") {
    return defaultOptions;
  }

  const merged = {};
  for (var attrname in defaultOptions) {
    merged[attrname] = defaultOptions[attrname];
  }

  for (attrname in options) {
    if (options[attrname]) {
      if (typeof merged[attrname] === "object") {
        merged[attrname] = merge(merged[attrname], options[attrname]);
      } else {
        merged[attrname] = options[attrname];
      }
    }
  }
  return merged;
};

export const inherits = (ctor, superCtor) => {
  if (typeof Object.create === "function") {
    // implementation from standard node.js 'util' module
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true,
      },
    });
  } else {
    // old school shim for old browsers
    ctor.super_ = superCtor;
    const TempCtor = function () {};
    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  }
};
