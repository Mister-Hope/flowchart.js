"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var util_1 = tslib_1.__importDefault(require("./util"));
var Start = /** @class */ (function (_super) {
    tslib_1.__extends(Start, _super);
    function Start(chart, options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        var symbol = chart.paper.rect(0, 0, 0, 0, 20);
        options.text = options.text || "Start";
        _this = _super.call(this, chart, options, symbol) || this;
        return _this;
    }
    return Start;
}(util_1.default));
exports.default = Start;
