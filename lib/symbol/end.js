"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var symbol_1 = tslib_1.__importDefault(require("./symbol"));
var End = /** @class */ (function (_super) {
    tslib_1.__extends(End, _super);
    function End(chart, options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        var symbol = chart.paper.rect(0, 0, 0, 0, 20);
        options.text = options.text || "End";
        _this = _super.call(this, chart, options, symbol) || this;
        return _this;
    }
    return End;
}(symbol_1.default));
exports.default = End;
