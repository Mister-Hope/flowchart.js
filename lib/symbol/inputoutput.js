"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var util_1 = tslib_1.__importDefault(require("./util"));
var action_1 = require("../action");
var InputOutput = /** @class */ (function (_super) {
    tslib_1.__extends(InputOutput, _super);
    function InputOutput(chart, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, chart, options) || this;
        _this.textMargin = _this.getAttr("text-margin");
        _this.text.attr({
            x: _this.textMargin * 3,
        });
        var width = _this.text.getBBox().width + 4 * _this.textMargin;
        var height = _this.text.getBBox().height + 2 * _this.textMargin;
        var startX = _this.textMargin;
        var startY = height / 2;
        var start = { x: startX, y: startY };
        var points = [
            { x: startX - _this.textMargin, y: height },
            { x: startX - _this.textMargin + width, y: height },
            { x: startX - _this.textMargin + width + 2 * _this.textMargin, y: 0 },
            { x: startX - _this.textMargin + 2 * _this.textMargin, y: 0 },
            { x: startX, y: startY },
        ];
        var symbol = action_1.drawPath(chart, start, points);
        symbol.attr({
            stroke: _this.getAttr("element-color"),
            "stroke-width": _this.getAttr("line-width"),
            fill: _this.getAttr("fill"),
        });
        if (options.link) {
            symbol.attr("href", options.link);
        }
        if (options.target) {
            symbol.attr("target", options.target);
        }
        if (options.key) {
            symbol.node.id = options.key;
        }
        symbol.node.setAttribute("class", _this.getAttr("class"));
        _this.text.attr({
            y: symbol.getBBox().height / 2,
        });
        _this.group.push(symbol);
        symbol.insertBefore(_this.text);
        _this.initialize();
        return _this;
    }
    InputOutput.prototype.getLeft = function () {
        var y = this.getY() + this.group.getBBox().height / 2;
        var x = this.getX() + this.textMargin;
        return { x: x, y: y };
    };
    InputOutput.prototype.getRight = function () {
        var y = this.getY() + this.group.getBBox().height / 2;
        var x = this.getX() + this.group.getBBox().width - this.textMargin;
        return { x: x, y: y };
    };
    return InputOutput;
}(util_1.default));
exports.default = InputOutput;
