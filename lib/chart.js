"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var raphael_1 = tslib_1.__importDefault(require("raphael"));
var util_1 = require("./util");
var config_1 = require("./config");
var condition_1 = tslib_1.__importDefault(require("./symbol/condition"));
var parallel_1 = tslib_1.__importDefault(require("./symbol/parallel"));
var FlowChart = /** @class */ (function () {
    function FlowChart(container, options) {
        if (options === void 0) { options = {}; }
        this.paper = new raphael_1.default(container);
        this.options = util_1.deepAssign(options, config_1.defaultConfig);
        this.symbols = [];
        this.lines = [];
        this.start = null;
    }
    FlowChart.prototype.handle = function (symbol) {
        if (this.symbols.indexOf(symbol) <= -1)
            this.symbols.push(symbol);
        var flowChart = this;
        if (symbol instanceof condition_1.default) {
            symbol.yes = function (nextSymbol) {
                symbol.yes_symbol = nextSymbol;
                if (symbol.no_symbol)
                    symbol.pathOk = true;
                return flowChart.handle(nextSymbol);
            };
            symbol.no = function (nextSymbol) {
                symbol.no_symbol = nextSymbol;
                if (symbol.yes_symbol)
                    symbol.pathOk = true;
                return flowChart.handle(nextSymbol);
            };
        }
        else if (symbol instanceof parallel_1.default) {
            symbol.path1 = function (nextSymbol) {
                symbol.path1_symbol = nextSymbol;
                if (symbol.path2_symbol)
                    symbol.pathOk = true;
                return flowChart.handle(nextSymbol);
            };
            symbol.path2 = function (nextSymbol) {
                symbol.path2_symbol = nextSymbol;
                if (symbol.path3_symbol)
                    symbol.pathOk = true;
                return flowChart.handle(nextSymbol);
            };
            symbol.path3 = function (nextSymbol) {
                symbol.path3_symbol = nextSymbol;
                if (symbol.path1_symbol)
                    symbol.pathOk = true;
                return flowChart.handle(nextSymbol);
            };
        }
        else
            symbol.then = function (nextSymbol) {
                symbol.next = nextSymbol;
                symbol.pathOk = true;
                return flowChart.handle(nextSymbol);
            };
        return symbol;
    };
    FlowChart.prototype.startWith = function (symbol) {
        this.start = symbol;
        return this.handle(symbol);
    };
    FlowChart.prototype.render = function () {
        var _this = this;
        var maxWidth = 0, maxHeight = 0, maxX = 0, maxY = 0, minX = 0, minY = 0, symbol, line;
        this.symbols.forEach(function (symbol) {
            if (symbol.width > maxWidth)
                maxWidth = symbol.width;
            if (symbol.height > maxHeight)
                maxHeight = symbol.height;
        });
        this.symbols.forEach(function (symbol) {
            symbol.shiftX(_this.options.x +
                (maxWidth - symbol.width) / 2 +
                _this.options["line-width"]);
            symbol.shiftY(_this.options.y +
                (maxHeight - symbol.height) / 2 +
                _this.options["line-width"]);
        });
        this.start.render();
        this.symbols.forEach(function (symbol) {
            symbol.renderLines();
        });
        maxX = this.maxXFromLine;
        var x;
        var y;
        this.symbols.forEach(function (symbol) {
            var leftX = symbol.getX();
            x = leftX + symbol.width;
            y = symbol.getY() + symbol.height;
            if (leftX < minX)
                minX = leftX;
            if (x > maxX)
                maxX = x;
            if (y > maxY)
                maxY = y;
        });
        for (var index = 0, length_1 = this.lines.length; index < length_1; index++) {
            line = this.lines[index].getBBox();
            x = line.x;
            y = line.y;
            var x2 = line.x2;
            var y2 = line.y2;
            if (x < minX)
                minX = x;
            if (y < minY)
                minY = y;
            if (x2 > maxX)
                maxX = x2;
            if (y2 > maxY)
                maxY = y2;
        }
        var scale = this.options["scale"];
        var lineWidth = this.options["line-width"];
        if (this.minXFromSymbols < minX)
            minX = this.minXFromSymbols;
        if (minX < 0)
            minX -= lineWidth;
        if (minY < 0)
            minY -= lineWidth;
        var width = maxX + lineWidth - minX;
        var height = maxY + lineWidth - minY;
        this.paper.setSize(width * scale, height * scale);
        this.paper.setViewBox(minX, minY, width, height, true);
    };
    FlowChart.prototype.clean = function () {
        if (this.paper) {
            var paperDom = this.paper.canvas;
            if (paperDom.parentNode)
                paperDom.parentNode.removeChild(paperDom);
        }
    };
    return FlowChart;
}());
exports.default = FlowChart;
