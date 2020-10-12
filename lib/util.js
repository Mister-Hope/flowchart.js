"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepAssign = void 0;
var tslib_1 = require("tslib");
exports.deepAssign = function (originObject) {
    var assignObjects = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        assignObjects[_i - 1] = arguments[_i];
    }
    if (assignObjects.length === 0)
        return originObject;
    var assignObject = assignObjects.shift();
    Object.keys(assignObject).forEach(function (property) {
        if (typeof originObject[property] === "object" &&
            !Array.isArray(originObject[property]) &&
            typeof assignObject[property] === "object" &&
            !Array.isArray(assignObject[property]))
            exports.deepAssign(originObject[property], assignObject[property]);
        else if (typeof assignObject[property] === "object")
            if (Array.isArray(assignObject[property]))
                originObject[property] = tslib_1.__spreadArrays(assignObject[property]);
            else
                originObject[property] = tslib_1.__assign({}, assignObject[property]);
        else
            originObject[property] = assignObject[property];
    });
    return exports.deepAssign.apply(void 0, tslib_1.__spreadArrays([originObject], assignObjects));
};
