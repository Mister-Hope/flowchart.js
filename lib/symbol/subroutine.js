"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var symbol_1 = tslib_1.__importDefault(require("./symbol"));
var Subroutine = /** @class */ (function (_super) {
    tslib_1.__extends(Subroutine, _super);
    function Subroutine(chart, options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        var symbol = chart.paper.rect(0, 0, 0, 0);
        _this = _super.call(this, chart, options, symbol) || this;
        symbol.attr({
            width: _this.text.getBBox().width +
                4 * _this.getAttr("text-margin"),
        });
        _this.text.attr({
            x: 2 * _this.getAttr("text-margin"),
        });
        var innerWrap = chart.paper.rect(0, 0, 0, 0);
        innerWrap.attr({
            x: _this.getAttr("text-margin"),
            stroke: _this.getAttr("element-color"),
            "stroke-width": _this.getAttr("line-width"),
            width: _this.text.getBBox().width +
                2 * _this.getAttr("text-margin"),
            height: _this.text.getBBox().height +
                2 * _this.getAttr("text-margin"),
            fill: _this.getAttr("fill"),
        });
        if (options.key) {
            innerWrap.node.id = options.key + "i";
        }
        var font = _this.getAttr("font");
        var fontF = _this.getAttr("font-family");
        var fontW = _this.getAttr("font-weight");
        if (font)
            innerWrap.attr({ font: font });
        if (fontF)
            innerWrap.attr({ "font-family": fontF });
        if (fontW)
            innerWrap.attr({ "font-weight": fontW });
        if (options.link) {
            innerWrap.attr("href", options.link);
        }
        if (options.target) {
            innerWrap.attr("target", options.target);
        }
        _this.group.push(innerWrap);
        innerWrap.insertBefore(_this.text);
        _this.initialize();
        return _this;
    }
    return Subroutine;
}(symbol_1.default));
exports.default = Subroutine;
