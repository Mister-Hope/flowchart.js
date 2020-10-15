"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var action_1 = require("../action");
var FlowChartSymbol = /** @class */ (function () {
    function FlowChartSymbol(chart, options, symbol) {
        this.leftLines = [];
        this.rightLines = [];
        this.topLines = [];
        this.bottomLines = [];
        this.chart = chart;
        this.group = this.chart.paper.set();
        this.symbol = symbol;
        this.connectedTo = [];
        this.symbolType = options.symbolType;
        this.flowstate = options.flowstate || "future";
        this.lineStyle = options.lineStyle || {};
        this.key = options.key || "";
        this.next_direction =
            options.next && options["direction_next"]
                ? options["direction_next"]
                : undefined;
        this.text = this.chart.paper.text(0, 0, options.text || "");
        // Raphael does not support the svg group tag so setting the text node id to the symbol node id plus t
        if (options.key)
            this.text.node.id = options.key + "t";
        this.text.node.setAttribute("class", this.getAttr("class") + "t");
        this.text.attr({
            "text-anchor": "start",
            x: this.getAttr("text-margin"),
            fill: this.getAttr("font-color"),
            "font-size": this.getAttr("font-size"),
        });
        var font = this.getAttr("font");
        var fontFamily = this.getAttr("font-family");
        var fontWeight = this.getAttr("font-weight");
        if (font)
            this.text.attr({ font: font });
        if (fontFamily)
            this.text.attr({ "font-family": fontFamily });
        if (fontWeight)
            this.text.attr({ "font-weight": fontWeight });
        if (options.link)
            this.text.attr("href", options.link);
        //ndrqu Add click function with event and options params
        if (options.function) {
            this.text.attr({ cursor: "pointer" });
            this.text.node.addEventListener("click", function (event) {
                window[options.function](event, options);
            }, false);
        }
        if (options.target)
            this.text.attr("target", options.target);
        var maxWidth = this.getAttr("maxWidth");
        if (maxWidth) {
            // using this approach: http://stackoverflow.com/a/3153457/22466
            var words = options.text.split(" ");
            var tempText = "";
            for (var index = 0; index < words.length; index++) {
                var word = words[index];
                this.text.attr("text", tempText + " " + word);
                if (this.text.getBBox().width > maxWidth)
                    tempText += "\n" + word;
                else
                    tempText += " " + word;
            }
            this.text.attr("text", tempText.substring(1));
        }
        this.group.push(this.text);
        if (symbol) {
            var tmpMargin = this.getAttr("text-margin");
            symbol.attr({
                fill: this.getAttr("fill"),
                stroke: this.getAttr("element-color"),
                "stroke-width": this.getAttr("line-width"),
                width: this.text.getBBox().width + 2 * tmpMargin,
                height: this.text.getBBox().height + 2 * tmpMargin,
            });
            if (options.link)
                symbol.attr("href", options.link);
            if (options.target)
                symbol.attr("target", options.target);
            symbol.node.setAttribute("class", this.getAttr("class"));
            //ndrqu Add click function with event and options params
            if (options.function) {
                symbol.node.addEventListener("click", function (event) {
                    window[options.function](event, options);
                }, false);
                symbol.attr({ cursor: "pointer" });
            }
            if (options.key)
                symbol.node.id = options.key;
            this.group.push(symbol);
            symbol.insertBefore(this.text);
            this.text.attr({
                y: symbol.getBBox().height / 2,
            });
            this.initialize();
        }
    }
    /* Gets the attribute based on Flowstate, Symbol-Name and default, first found wins */
    FlowChartSymbol.prototype.getAttr = function (attName) {
        if (!this.chart)
            return undefined;
        var opt3 = this.chart.options ? this.chart.options[attName] : undefined;
        var opt2 = this.chart.options.symbols
            ? this.chart.options.symbols[this.symbolType][attName]
            : undefined;
        if (this.chart.options.flowstate &&
            this.chart.options.flowstate[this.flowstate]) {
            var opt1 = this.chart.options.flowstate[this.flowstate][attName];
            if (opt1)
                return opt1;
        }
        return opt2 || opt3;
    };
    FlowChartSymbol.prototype.initialize = function () {
        this.group.transform("t" + this.getAttr("line-width") + "," + this.getAttr("line-width"));
        this.width = this.group.getBBox().width;
        this.height = this.group.getBBox().height;
    };
    FlowChartSymbol.prototype.getCenter = function () {
        return {
            x: this.getX() + this.width / 2,
            y: this.getY() + this.height / 2,
        };
    };
    FlowChartSymbol.prototype.getX = function () {
        return this.group.getBBox().x;
    };
    FlowChartSymbol.prototype.getY = function () {
        return this.group.getBBox().y;
    };
    FlowChartSymbol.prototype.shiftX = function (x) {
        this.group.transform("t" + (this.getX() + x) + "," + this.getY());
    };
    FlowChartSymbol.prototype.setX = function (x) {
        this.group.transform("t" + x + "," + this.getY());
    };
    FlowChartSymbol.prototype.shiftY = function (y) {
        this.group.transform("$t" + this.getX() + "," + (this.getY() + y));
    };
    FlowChartSymbol.prototype.setY = function (y) {
        this.group.transform("t" + this.getX() + "," + y);
    };
    FlowChartSymbol.prototype.getTop = function () {
        var y = this.getY();
        var x = this.getX() + this.width / 2;
        return { x: x, y: y };
    };
    FlowChartSymbol.prototype.getBottom = function () {
        var y = this.getY() + this.height;
        var x = this.getX() + this.width / 2;
        return { x: x, y: y };
    };
    FlowChartSymbol.prototype.getLeft = function () {
        var y = this.getY() + this.group.getBBox().height / 2;
        var x = this.getX();
        return { x: x, y: y };
    };
    FlowChartSymbol.prototype.getRight = function () {
        var y = this.getY() + this.group.getBBox().height / 2;
        var x = this.getX() + this.group.getBBox().width;
        return { x: x, y: y };
    };
    FlowChartSymbol.prototype.render = function () {
        var _this = this;
        if (this.next) {
            var self_1 = this;
            var lineLength_1 = this.getAttr("line-length");
            if (this.next_direction === "right") {
                var rightPoint = this.getRight();
                if (!this.next.isPositioned) {
                    this.next.setY(rightPoint.y - this.next.height / 2);
                    this.next.shiftX(this.group.getBBox().x + this.width + lineLength_1);
                    var shift_1 = function () {
                        var hasSymbolUnder = false;
                        var symb;
                        for (var index = 0; index < _this.chart.symbols.length; index++) {
                            symb = self_1.chart.symbols[index];
                            var diff = Math.abs(symb.getCenter().x - _this.next.getCenter().x);
                            if (symb.getCenter().y > _this.next.getCenter().y &&
                                diff <= _this.next.width / 2) {
                                hasSymbolUnder = true;
                                break;
                            }
                        }
                        if (hasSymbolUnder) {
                            if (_this.next.symbolType === "end")
                                return;
                            _this.next.setX(symb.getX() + symb.width + lineLength_1);
                            shift_1();
                        }
                    };
                    shift_1();
                    this.next.isPositioned = true;
                    this.next.render();
                }
            }
            else if (this.next_direction === "left") {
                var leftPoint = this.getLeft();
                if (!this.next.isPositioned) {
                    this.next.setY(leftPoint.y - this.next.height / 2);
                    this.next.shiftX(-(this.group.getBBox().x + this.width + lineLength_1));
                    var shift_2 = function () {
                        var hasSymbolUnder = false;
                        var symb;
                        for (var i = 0; i < _this.chart.symbols.length; i++) {
                            symb = self_1.chart.symbols[i];
                            var diff = Math.abs(symb.getCenter().x - _this.next.getCenter().x);
                            if (symb.getCenter().y > _this.next.getCenter().y &&
                                diff <= _this.next.width / 2) {
                                hasSymbolUnder = true;
                                break;
                            }
                        }
                        if (hasSymbolUnder) {
                            if (_this.next.symbolType === "end")
                                return;
                            _this.next.setX(symb.getX() + symb.width + lineLength_1);
                            shift_2();
                        }
                    };
                    shift_2();
                    this.next.isPositioned = true;
                    this.next.render();
                }
            }
            else {
                var bottomPoint = this.getBottom();
                if (!this.next.isPositioned) {
                    this.next.shiftY(this.getY() + this.height + lineLength_1);
                    this.next.setX(bottomPoint.x - this.next.width / 2);
                    this.next.isPositioned = true;
                    this.next.render();
                }
            }
        }
    };
    FlowChartSymbol.prototype.renderLines = function () {
        if (this.next)
            if (this.next_direction)
                this.drawLineTo(this.next, this.getAttr("arrow-text") || "", this.next_direction);
            else
                this.drawLineTo(this.next, this.getAttr("arrow-text") || "");
    };
    FlowChartSymbol.prototype.drawLineTo = function (symbol, text, direction) {
        if (this.connectedTo.indexOf(symbol) < 0)
            this.connectedTo.push(symbol);
        var x = this.getCenter().x, y = this.getCenter().y, right = this.getRight(), bottom = this.getBottom(), top = this.getTop(), left = this.getLeft();
        var symbolX = symbol.getCenter().x, symbolY = symbol.getCenter().y, symbolTop = symbol.getTop(), symbolRight = symbol.getRight(), symbolLeft = symbol.getLeft();
        var isOnSameColumn = x === symbolX, isOnSameLine = y === symbolY, isUnder = y < symbolY, isUpper = y > symbolY || this === symbol, isLeft = x > symbolX, isRight = x < symbolX;
        var maxX = 0, line;
        var lineLength = this.getAttr("line-length");
        var lineWith = this.getAttr("line-width");
        if ((!direction || direction === "bottom") && isOnSameColumn && isUnder) {
            if (symbol.topLines.length === 0 && this.bottomLines.length === 0)
                line = action_1.drawLine(this.chart, bottom, [symbolTop], text);
            else {
                var yOffset = Math.max(symbol.topLines.length, this.bottomLines.length) * 10;
                line = action_1.drawLine(this.chart, bottom, [
                    { x: symbolTop.x, y: symbolTop.y - yOffset },
                    { x: symbolTop.x, y: symbolTop.y },
                ], text);
            }
            this.bottomLines.push(line);
            symbol.topLines.push(line);
            this.bottomStart = true;
            symbol.topEnd = true;
            maxX = bottom.x;
        }
        else if ((!direction || direction === "right") &&
            isOnSameLine &&
            isRight) {
            if (symbol.leftLines.length === 0 && this.rightLines.length === 0)
                line = action_1.drawLine(this.chart, right, [symbolLeft], text);
            else {
                var yOffset = Math.max(symbol.leftLines.length, this.rightLines.length) * 10;
                line = action_1.drawLine(this.chart, right, [
                    { x: right.x, y: right.y - yOffset },
                    { x: right.x, y: symbolLeft.y - yOffset },
                    { x: symbolLeft.x, y: symbolLeft.y - yOffset },
                    { x: symbolLeft.x, y: symbolLeft.y },
                ], text);
            }
            this.rightLines.push(line);
            symbol.leftLines.push(line);
            this.rightStart = true;
            symbol.leftEnd = true;
            maxX = symbolLeft.x;
        }
        else if ((!direction || direction === "left") && isOnSameLine && isLeft) {
            if (symbol.rightLines.length === 0 && this.leftLines.length === 0)
                line = action_1.drawLine(this.chart, left, [symbolRight], text);
            else {
                var yOffset = Math.max(symbol.rightLines.length, this.leftLines.length) * 10;
                line = action_1.drawLine(this.chart, right, [
                    { x: right.x, y: right.y - yOffset },
                    { x: right.x, y: symbolRight.y - yOffset },
                    { x: symbolRight.x, y: symbolRight.y - yOffset },
                    { x: symbolRight.x, y: symbolRight.y },
                ], text);
            }
            this.leftLines.push(line);
            symbol.rightLines.push(line);
            this.leftStart = true;
            symbol.rightEnd = true;
            maxX = symbolRight.x;
        }
        else if ((!direction || direction === "right") &&
            isOnSameColumn &&
            isUpper) {
            var yOffset = Math.max(symbol.topLines.length, this.rightLines.length) * 10;
            line = action_1.drawLine(this.chart, right, [
                { x: right.x + lineLength / 2, y: right.y - yOffset },
                {
                    x: right.x + lineLength / 2,
                    y: symbolTop.y - lineLength / 2 - yOffset,
                },
                { x: symbolTop.x, y: symbolTop.y - lineLength / 2 - yOffset },
                { x: symbolTop.x, y: symbolTop.y },
            ], text);
            this.rightLines.push(line);
            symbol.topLines.push(line);
            this.rightStart = true;
            symbol.topEnd = true;
            maxX = right.x + lineLength / 2;
        }
        else if ((!direction || direction === "right") &&
            isOnSameColumn &&
            isUnder) {
            var yOffset = Math.max(symbol.topLines.length, this.rightLines.length) * 10;
            line = action_1.drawLine(this.chart, right, [
                { x: right.x + lineLength / 2, y: right.y - yOffset },
                {
                    x: right.x + lineLength / 2,
                    y: symbolTop.y - lineLength / 2 - yOffset,
                },
                { x: symbolTop.x, y: symbolTop.y - lineLength / 2 - yOffset },
                { x: symbolTop.x, y: symbolTop.y },
            ], text);
            this.rightLines.push(line);
            symbol.topLines.push(line);
            this.rightStart = true;
            symbol.topEnd = true;
            maxX = right.x + lineLength / 2;
        }
        else if ((!direction || direction === "bottom") && isLeft) {
            var yOffset = Math.max(symbol.topLines.length, this.bottomLines.length) * 10;
            if (this.leftEnd && isUpper) {
                line = action_1.drawLine(this.chart, bottom, [
                    { x: bottom.x, y: bottom.y + lineLength / 2 - yOffset },
                    {
                        x: bottom.x + (bottom.x - symbolTop.x) / 2,
                        y: bottom.y + lineLength / 2 - yOffset,
                    },
                    {
                        x: bottom.x + (bottom.x - symbolTop.x) / 2,
                        y: symbolTop.y - lineLength / 2 - yOffset,
                    },
                    { x: symbolTop.x, y: symbolTop.y - lineLength / 2 - yOffset },
                    { x: symbolTop.x, y: symbolTop.y },
                ], text);
            }
            else {
                line = action_1.drawLine(this.chart, bottom, [
                    { x: bottom.x, y: symbolTop.y - lineLength / 2 - yOffset },
                    { x: symbolTop.x, y: symbolTop.y - lineLength / 2 - yOffset },
                    { x: symbolTop.x, y: symbolTop.y },
                ], text);
            }
            this.bottomLines.push(line);
            symbol.topLines.push(line);
            this.bottomStart = true;
            symbol.topEnd = true;
            maxX = bottom.x + (bottom.x - symbolTop.x) / 2;
        }
        else if ((!direction || direction === "bottom") && isRight && isUnder) {
            var yOffset = Math.max(symbol.topLines.length, this.bottomLines.length) * 10;
            line = action_1.drawLine(this.chart, bottom, [
                { x: bottom.x, y: symbolTop.y - lineLength / 2 - yOffset },
                { x: symbolTop.x, y: symbolTop.y - lineLength / 2 - yOffset },
                { x: symbolTop.x, y: symbolTop.y },
            ], text);
            this.bottomLines.push(line);
            symbol.topLines.push(line);
            this.bottomStart = true;
            symbol.topEnd = true;
            maxX = bottom.x;
            if (symbolTop.x > maxX)
                maxX = symbolTop.x;
        }
        else if ((!direction || direction === "bottom") && isRight) {
            var yOffset = Math.max(symbol.topLines.length, this.bottomLines.length) * 10;
            line = action_1.drawLine(this.chart, bottom, [
                { x: bottom.x, y: bottom.y + lineLength / 2 - yOffset },
                {
                    x: bottom.x + (bottom.x - symbolTop.x) / 2,
                    y: bottom.y + lineLength / 2 - yOffset,
                },
                {
                    x: bottom.x + (bottom.x - symbolTop.x) / 2,
                    y: symbolTop.y - lineLength / 2 - yOffset,
                },
                { x: symbolTop.x, y: symbolTop.y - lineLength / 2 - yOffset },
                { x: symbolTop.x, y: symbolTop.y },
            ], text);
            this.bottomLines.push(line);
            symbol.topLines.push(line);
            this.bottomStart = true;
            symbol.topEnd = true;
            maxX = bottom.x + (bottom.x - symbolTop.x) / 2;
        }
        else if (direction && direction === "right" && isLeft) {
            var yOffset = Math.max(symbol.topLines.length, this.rightLines.length) * 10;
            line = action_1.drawLine(this.chart, right, [
                { x: right.x + lineLength / 2, y: right.y },
                {
                    x: right.x + lineLength / 2,
                    y: symbolTop.y - lineLength / 2 - yOffset,
                },
                { x: symbolTop.x, y: symbolTop.y - lineLength / 2 - yOffset },
                { x: symbolTop.x, y: symbolTop.y },
            ], text);
            this.rightLines.push(line);
            symbol.topLines.push(line);
            this.rightStart = true;
            symbol.topEnd = true;
            maxX = right.x + lineLength / 2;
        }
        else if (direction && direction === "right" && isRight) {
            var yOffset = Math.max(symbol.topLines.length, this.rightLines.length) * 10;
            line = action_1.drawLine(this.chart, right, [
                { x: symbolTop.x, y: right.y - yOffset },
                { x: symbolTop.x, y: symbolTop.y - yOffset },
            ], text);
            this.rightLines.push(line);
            symbol.topLines.push(line);
            this.rightStart = true;
            symbol.topEnd = true;
            maxX = right.x + lineLength / 2;
        }
        else if (direction &&
            direction === "bottom" &&
            isOnSameColumn &&
            isUpper) {
            var yOffset = Math.max(symbol.topLines.length, this.bottomLines.length) * 10;
            line = action_1.drawLine(this.chart, bottom, [
                { x: bottom.x, y: bottom.y + lineLength / 2 - yOffset },
                {
                    x: right.x + lineLength / 2,
                    y: bottom.y + lineLength / 2 - yOffset,
                },
                {
                    x: right.x + lineLength / 2,
                    y: symbolTop.y - lineLength / 2 - yOffset,
                },
                { x: symbolTop.x, y: symbolTop.y - lineLength / 2 - yOffset },
                { x: symbolTop.x, y: symbolTop.y },
            ], text);
            this.bottomLines.push(line);
            symbol.topLines.push(line);
            this.bottomStart = true;
            symbol.topEnd = true;
            maxX = bottom.x + lineLength / 2;
        }
        else if (direction === "left" && isOnSameColumn && isUpper) {
            var diffX = left.x - lineLength / 2;
            if (symbolLeft.x < left.x) {
                diffX = symbolLeft.x - lineLength / 2;
            }
            var yOffset = Math.max(symbol.topLines.length, this.leftLines.length) * 10;
            line = action_1.drawLine(this.chart, left, [
                { x: diffX, y: left.y - yOffset },
                { x: diffX, y: symbolTop.y - lineLength / 2 - yOffset },
                { x: symbolTop.x, y: symbolTop.y - lineLength / 2 - yOffset },
                { x: symbolTop.x, y: symbolTop.y },
            ], text);
            this.leftLines.push(line);
            symbol.topLines.push(line);
            this.leftStart = true;
            symbol.topEnd = true;
            maxX = left.x;
        }
        else if (direction === "left") {
            var yOffset = Math.max(symbol.topLines.length, this.leftLines.length) * 10;
            line = action_1.drawLine(this.chart, left, [
                { x: symbolTop.x + (left.x - symbolTop.x) / 2, y: left.y },
                {
                    x: symbolTop.x + (left.x - symbolTop.x) / 2,
                    y: symbolTop.y - lineLength / 2 - yOffset,
                },
                { x: symbolTop.x, y: symbolTop.y - lineLength / 2 - yOffset },
                { x: symbolTop.x, y: symbolTop.y },
            ], text);
            this.leftLines.push(line);
            symbol.topLines.push(line);
            this.leftStart = true;
            symbol.topEnd = true;
            maxX = left.x;
        }
        else if (direction === "top") {
            var yOffset = Math.max(symbol.topLines.length, this.topLines.length) * 10;
            line = action_1.drawLine(this.chart, top, [
                { x: top.x, y: symbolTop.y - lineLength / 2 - yOffset },
                { x: symbolTop.x, y: symbolTop.y - lineLength / 2 - yOffset },
                { x: symbolTop.x, y: symbolTop.y },
            ], text);
            this.topLines.push(line);
            symbol.topLines.push(line);
            this.topStart = true;
            symbol.topEnd = true;
            maxX = top.x;
        }
        //update line style
        if (this.lineStyle[symbol.key] && line)
            line.attr(this.lineStyle[symbol.key]);
        if (line) {
            for (var l = 0, llen = this.chart.lines.length; l < llen; l++) {
                var otherLine = this.chart.lines[l];
                var ePath = otherLine.attr("path"), lPath = line.attr("path");
                for (var iP = 0, lenP = ePath.length - 1; iP < lenP; iP++) {
                    var newPath = [];
                    newPath.push(["M", ePath[iP][1], ePath[iP][2]]);
                    newPath.push(["L", ePath[iP + 1][1], ePath[iP + 1][2]]);
                    var line1FromX = newPath[0][1];
                    var line1FromY = newPath[0][2];
                    var line1ToX = newPath[1][1];
                    var line1ToY = newPath[1][2];
                    for (var lP = 0, lenlP = lPath.length - 1; lP < lenlP; lP++) {
                        var newLinePath = [];
                        newLinePath.push(["M", lPath[lP][1], lPath[lP][2]]);
                        newLinePath.push(["L", lPath[lP + 1][1], lPath[lP + 1][2]]);
                        var line2FromX = newLinePath[0][1];
                        var line2FromY = newLinePath[0][2];
                        var line2ToX = newLinePath[1][1];
                        var line2ToY = newLinePath[1][2];
                        var res = action_1.checkLineIntersection(line1FromX, line1FromY, line1ToX, line1ToY, line2FromX, line2FromY, line2ToX, line2ToY);
                        if (res.onLine1 && res.onLine2) {
                            var newSegment = void 0;
                            if (line2FromY === line2ToY) {
                                if (line2FromX > line2ToX) {
                                    newSegment = ["L", res.x + lineWith * 2, line2FromY];
                                    lPath.splice(lP + 1, 0, newSegment);
                                    newSegment = [
                                        "C",
                                        res.x + lineWith * 2,
                                        line2FromY,
                                        res.x,
                                        line2FromY - lineWith * 4,
                                        res.x - lineWith * 2,
                                        line2FromY,
                                    ];
                                    lPath.splice(lP + 2, 0, newSegment);
                                    line.attr("path", lPath);
                                }
                                else {
                                    newSegment = ["L", res.x - lineWith * 2, line2FromY];
                                    lPath.splice(lP + 1, 0, newSegment);
                                    newSegment = [
                                        "C",
                                        res.x - lineWith * 2,
                                        line2FromY,
                                        res.x,
                                        line2FromY - lineWith * 4,
                                        res.x + lineWith * 2,
                                        line2FromY,
                                    ];
                                    lPath.splice(lP + 2, 0, newSegment);
                                    line.attr("path", lPath);
                                }
                            }
                            else {
                                if (line2FromY > line2ToY) {
                                    newSegment = ["L", line2FromX, res.y + lineWith * 2];
                                    lPath.splice(lP + 1, 0, newSegment);
                                    newSegment = [
                                        "C",
                                        line2FromX,
                                        res.y + lineWith * 2,
                                        line2FromX + lineWith * 4,
                                        res.y,
                                        line2FromX,
                                        res.y - lineWith * 2,
                                    ];
                                    lPath.splice(lP + 2, 0, newSegment);
                                    line.attr("path", lPath);
                                }
                                else {
                                    newSegment = ["L", line2FromX, res.y - lineWith * 2];
                                    lPath.splice(lP + 1, 0, newSegment);
                                    newSegment = [
                                        "C",
                                        line2FromX,
                                        res.y - lineWith * 2,
                                        line2FromX + lineWith * 4,
                                        res.y,
                                        line2FromX,
                                        res.y + lineWith * 2,
                                    ];
                                    lPath.splice(lP + 2, 0, newSegment);
                                    line.attr("path", lPath);
                                }
                            }
                            lP += 2;
                        }
                    }
                }
            }
            this.chart.lines.push(line);
            if (this.chart.minXFromSymbols === undefined ||
                this.chart.minXFromSymbols > left.x)
                this.chart.minXFromSymbols = left.x;
        }
        if (!this.chart.maxXFromLine ||
            (this.chart.maxXFromLine && maxX > this.chart.maxXFromLine))
            this.chart.maxXFromLine = maxX;
    };
    return FlowChartSymbol;
}());
exports.default = FlowChartSymbol;
