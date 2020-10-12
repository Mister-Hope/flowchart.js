"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = void 0;
exports.merge = function (options, defaultOptions) {
    if (!options || typeof options === "function")
        return defaultOptions;
    var merged = {};
    for (var attrname in defaultOptions)
        merged[attrname] = defaultOptions[attrname];
    for (var attrname in options) {
        if (options[attrname]) {
            if (typeof merged[attrname] === "object") {
                merged[attrname] = exports.merge(merged[attrname], options[attrname]);
            }
            else {
                merged[attrname] = options[attrname];
            }
        }
    }
    return merged;
};
