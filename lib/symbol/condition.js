"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var util_1 = tslib_1.__importDefault(require("./util"));
var action_1 = require("../action");
var Condition = /** @class */ (function (_super) {
    tslib_1.__extends(Condition, _super);
    function Condition(chart, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, chart, options) || this;
        _this.yes_annotation = options.yes_annotation;
        _this.no_annotation = options.no_annotation;
        _this.textMargin = _this.getAttr("text-margin");
        _this.yes_direction = options.direction_yes;
        _this.no_direction = options.direction_no;
        _this.params = options.params;
        if (!_this.no_direction && _this.yes_direction === "right") {
            _this.no_direction = "bottom";
        }
        else if (!_this.yes_direction && _this.no_direction === "bottom") {
            _this.yes_direction = "right";
        }
        _this.yes_direction = _this.yes_direction || "bottom";
        _this.no_direction = _this.no_direction || "right";
        _this.text.attr({
            x: _this.textMargin * 2,
        });
        var width = _this.text.getBBox().width + 3 * _this.textMargin;
        width += width / 2;
        var height = _this.text.getBBox().height + 2 * _this.textMargin;
        height += height / 2;
        height = Math.max(width * 0.5, height);
        var startX = width / 4;
        var startY = height / 4;
        _this.text.attr({
            x: startX + _this.textMargin / 2,
        });
        var start = { x: startX, y: startY };
        var points = [
            { x: startX - width / 4, y: startY + height / 4 },
            {
                x: startX - width / 4 + width / 2,
                y: startY + height / 4 + height / 2,
            },
            { x: startX - width / 4 + width, y: startY + height / 4 },
            {
                x: startX - width / 4 + width / 2,
                y: startY + height / 4 - height / 2,
            },
            { x: startX - width / 4, y: startY + height / 4 },
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
    Condition.prototype.render = function () {
        if (this.yes_direction) {
            this[this.yes_direction + "_symbol"] = this.yes_symbol;
        }
        if (this.no_direction) {
            this[this.no_direction + "_symbol"] = this.no_symbol;
        }
        var lineLength = this.getAttr("line-length");
        if (this.bottom_symbol) {
            var bottomPoint = this.getBottom();
            if (!this.bottom_symbol.isPositioned) {
                this.bottom_symbol.shiftY(this.getY() + this.height + lineLength);
                this.bottom_symbol.setX(bottomPoint.x - this.bottom_symbol.width / 2);
                this.bottom_symbol.isPositioned = true;
                this.bottom_symbol.render();
            }
        }
        if (this.right_symbol) {
            var rightPoint = this.getRight();
            if (!this.right_symbol.isPositioned) {
                this.right_symbol.setY(rightPoint.y - this.right_symbol.height / 2);
                this.right_symbol.shiftX(this.group.getBBox().x + this.width + lineLength);
                var self = this;
                (function shift() {
                    var hasSymbolUnder = false;
                    var symb;
                    for (var i = 0, len = self.chart.symbols.length; i < len; i++) {
                        symb = self.chart.symbols[i];
                        if (!self.params["align-next"] ||
                            self.params["align-next"] !== "no") {
                            var diff = Math.abs(symb.getCenter().x - self.right_symbol.getCenter().x);
                            if (symb.getCenter().y > self.right_symbol.getCenter().y &&
                                diff <= self.right_symbol.width / 2) {
                                hasSymbolUnder = true;
                                break;
                            }
                        }
                    }
                    if (hasSymbolUnder) {
                        if (self.right_symbol.symbolType === "end")
                            return;
                        self.right_symbol.setX(symb.getX() + symb.width + lineLength);
                        shift();
                    }
                })();
                this.right_symbol.isPositioned = true;
                this.right_symbol.render();
            }
        }
        if (this.left_symbol) {
            var leftPoint = this.getLeft();
            if (!this.left_symbol.isPositioned) {
                this.left_symbol.setY(leftPoint.y - this.left_symbol.height / 2);
                this.left_symbol.shiftX(-(this.group.getBBox().x + this.width + lineLength));
                var self = this;
                (function shift() {
                    var hasSymbolUnder = false;
                    var symb;
                    for (var i = 0, len = self.chart.symbols.length; i < len; i++) {
                        symb = self.chart.symbols[i];
                        if (!self.params["align-next"] ||
                            self.params["align-next"] !== "no") {
                            var diff = Math.abs(symb.getCenter().x - self.left_symbol.getCenter().x);
                            if (symb.getCenter().y > self.left_symbol.getCenter().y &&
                                diff <= self.left_symbol.width / 2) {
                                hasSymbolUnder = true;
                                break;
                            }
                        }
                    }
                    if (hasSymbolUnder) {
                        if (self.left_symbol.symbolType === "end")
                            return;
                        self.left_symbol.setX(symb.getX() + symb.width + lineLength);
                        shift();
                    }
                })();
                this.left_symbol.isPositioned = true;
                this.left_symbol.render();
            }
        }
    };
    Condition.prototype.renderLines = function () {
        if (this.yes_symbol) {
            this.drawLineTo(this.yes_symbol, this.yes_annotation ? this.yes_annotation : this.getAttr("yes-text"), this.yes_direction);
        }
        if (this.no_symbol) {
            this.drawLineTo(this.no_symbol, this.no_annotation ? this.no_annotation : this.getAttr("no-text"), this.no_direction);
        }
    };
    return Condition;
}(util_1.default));
exports.default = Condition;
