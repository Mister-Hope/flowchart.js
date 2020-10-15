"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
var tslib_1 = require("tslib");
var chart_1 = tslib_1.__importDefault(require("./chart"));
var condition_1 = tslib_1.__importDefault(require("./symbol/condition"));
var end_1 = tslib_1.__importDefault(require("./symbol/end"));
var inputoutput_1 = tslib_1.__importDefault(require("./symbol/inputoutput"));
var operation_1 = tslib_1.__importDefault(require("./symbol/operation"));
var parallel_1 = tslib_1.__importDefault(require("./symbol/parallel"));
var start_1 = tslib_1.__importDefault(require("./symbol/start"));
var subroutine_1 = tslib_1.__importDefault(require("./symbol/subroutine"));
var chart = {
    symbols: {},
    start: null,
    diagram: null,
    drawSVG: function (container, options) {
        var _this = this;
        var self = this;
        if (this.diagram)
            this.diagram.clean();
        var diagram = new chart_1.default(container, options);
        this.diagram = diagram;
        var dispSymbols = {};
        var getDisplaySymbol = function (options) {
            if (dispSymbols[options.key])
                return dispSymbols[options.key];
            switch (options.symbolType) {
                case "start":
                    dispSymbols[options.key] = new start_1.default(diagram, options);
                    break;
                case "end":
                    dispSymbols[options.key] = new end_1.default(diagram, options);
                    break;
                case "operation":
                    dispSymbols[options.key] = new operation_1.default(diagram, options);
                    break;
                case "inputoutput":
                    dispSymbols[options.key] = new inputoutput_1.default(diagram, options);
                    break;
                case "subroutine":
                    dispSymbols[options.key] = new subroutine_1.default(diagram, options);
                    break;
                case "condition":
                    dispSymbols[options.key] = new condition_1.default(diagram, options);
                    break;
                case "parallel":
                    dispSymbols[options.key] = new parallel_1.default(diagram, options);
                    break;
                default:
                    throw new Error("Wrong symbol type!");
            }
            return dispSymbols[options.key];
        };
        var constructChart = function (symbol, prevDisp, prev) {
            var dispSymb = getDisplaySymbol(symbol);
            if (_this.start === symbol)
                diagram.startWith(dispSymb);
            else if (prevDisp && prev && !prevDisp.pathOk) {
                if (prevDisp instanceof condition_1.default) {
                    if (prev.yes === symbol)
                        prevDisp.yes(dispSymb);
                    if (prev.no === symbol)
                        prevDisp.no(dispSymb);
                }
                else if (prevDisp instanceof parallel_1.default) {
                    if (prev.path1 === symbol)
                        prevDisp.path1(dispSymb);
                    if (prev.path2 === symbol)
                        prevDisp.path2(dispSymb);
                    if (prev.path3 === symbol)
                        prevDisp.path3(dispSymb);
                }
                else
                    prevDisp.then(dispSymb);
            }
            if (dispSymb.pathOk)
                return dispSymb;
            if (dispSymb instanceof condition_1.default) {
                if (symbol.yes)
                    constructChart(symbol.yes, dispSymb, symbol);
                if (symbol.no)
                    constructChart(symbol.no, dispSymb, symbol);
            }
            else if (dispSymb instanceof parallel_1.default) {
                if (symbol.path1)
                    constructChart(symbol.path1, dispSymb, symbol);
                if (symbol.path2)
                    constructChart(symbol.path2, dispSymb, symbol);
                if (symbol.path3)
                    constructChart(symbol.path3, dispSymb, symbol);
            }
            else if (symbol.next)
                constructChart(symbol.next, dispSymb, symbol);
            return dispSymb;
        };
        constructChart(this.start);
        diagram.render();
    },
    clean: function () {
        this.diagram.clean();
    },
    options: function () {
        return this.diagram.options;
    },
};
var getLines = function (input) {
    var lines = [];
    var prevBreak = 0;
    for (var index = 1, length_1 = input.length; index < length_1; index++)
        if (input[index] === "\n" && input[index - 1] !== "\\") {
            var line = input.substring(prevBreak, index);
            prevBreak = index + 1;
            lines.push(line.replace(/\\\n/g, "\n"));
        }
    if (prevBreak < input.length)
        lines.push(input.substr(prevBreak));
    for (var index = 1, length_2 = lines.length; index < length_2;) {
        var currentLine = lines[index];
        if (currentLine.indexOf("->") < 0 &&
            currentLine.indexOf("=>") < 0 &&
            currentLine.indexOf("@>") < 0) {
            lines[index - 1] += "\n" + currentLine;
            lines.splice(index, 1);
            length_2--;
        }
        else
            index++;
    }
    return lines;
};
var getStyle = function (line) {
    var startIndex = line.indexOf("(") + 1;
    var endIndex = line.indexOf(")");
    if (startIndex >= 0 && endIndex >= 0)
        return line.substring(startIndex, endIndex);
    return "{}";
};
var getSymbolValue = function (line) {
    var startIndex = line.indexOf("(") + 1;
    var endIndex = line.indexOf(")");
    if (startIndex >= 0 && endIndex >= 0)
        return line.substring(startIndex, endIndex);
    return "";
};
var getSymbol = function (line) {
    var startIndex = line.indexOf("(") + 1;
    var endIndex = line.indexOf(")");
    if (startIndex >= 0 && endIndex >= 0)
        return chart.symbols[line.substring(0, startIndex - 1)];
    return chart.symbols[line];
};
var getAnnotation = function (line) {
    var startIndex = line.indexOf("(") + 1, endIndex = line.indexOf(")");
    var tmp = line.substring(startIndex, endIndex);
    if (tmp.indexOf(",") > 0) {
        tmp = tmp.substring(0, tmp.indexOf(","));
    }
    var tmpSplit = tmp.split("@");
    return tmpSplit.length > 1
        ? startIndex >= 0 && endIndex >= 0
            ? tmpSplit[1]
            : ""
        : "";
};
exports.parse = function (input) {
    if (input === void 0) { input = ""; }
    var lines = getLines(input.trim());
    var getNextPath = function (line) {
        var next = "next";
        var startIndex = line.indexOf("(") + 1;
        var endIndex = line.indexOf(")");
        if (startIndex >= 0 && endIndex >= 0) {
            next = flowSymb.substring(startIndex, endIndex);
            if (next.indexOf(",") < 0)
                if (next !== "yes" && next !== "no")
                    next = "next, " + next;
        }
        return next;
    };
    while (lines.length > 0) {
        var line = lines.splice(0, 1)[0].trim();
        if (line.indexOf("=>") >= 0) {
            // definition
            var parts = line.split("=>");
            var symbol = {
                key: parts[0].replace(/\(.*\)/, ""),
                symbolType: parts[1],
                text: null,
                link: null,
                target: null,
                flowstate: null,
                function: null,
                lineStyle: {},
                params: {},
            };
            //parse parameters
            var params = parts[0].match(/\((.*)\)/);
            if (params && params.length > 1) {
                var entries = params[1].split(",");
                for (var i = 0; i < entries.length; i++) {
                    var entry = entries[i].split("=");
                    if (entry.length == 2) {
                        symbol.params[entry[0]] = entry[1];
                    }
                }
            }
            var sub;
            if (symbol.symbolType.indexOf(": ") >= 0) {
                sub = symbol.symbolType.split(": ");
                symbol.symbolType = sub.shift();
                symbol.text = sub.join(": ");
            }
            if (symbol.text && symbol.text.indexOf(":$") >= 0) {
                sub = symbol.text.split(":$");
                symbol.text = sub.shift();
                symbol.function = sub.join(":$");
            }
            else if (symbol.symbolType.indexOf(":$") >= 0) {
                sub = symbol.symbolType.split(":$");
                symbol.symbolType = sub.shift();
                symbol.function = sub.join(":$");
            }
            else if (symbol.text && symbol.text.indexOf(":>") >= 0) {
                sub = symbol.text.split(":>");
                symbol.text = sub.shift();
                symbol.link = sub.join(":>");
            }
            else if (symbol.symbolType.indexOf(":>") >= 0) {
                sub = symbol.symbolType.split(":>");
                symbol.symbolType = sub.shift();
                symbol.link = sub.join(":>");
            }
            if (symbol.symbolType.indexOf("\n") >= 0) {
                symbol.symbolType = symbol.symbolType.split("\n")[0];
            }
            /* adding support for links */
            if (symbol.link) {
                var startIndex = symbol.link.indexOf("[") + 1;
                var endIndex = symbol.link.indexOf("]");
                if (startIndex >= 0 && endIndex >= 0) {
                    symbol.target = symbol.link.substring(startIndex, endIndex);
                    symbol.link = symbol.link.substring(0, startIndex - 1);
                }
            }
            /* end of link support */
            /* adding support for flowstates */
            if (symbol.text) {
                if (symbol.text.indexOf("|") >= 0) {
                    var txtAndState = symbol.text.split("|");
                    symbol.flowstate = txtAndState.pop().trim();
                    symbol.text = txtAndState.join("|");
                }
            }
            /* end of flowstate support */
            chart.symbols[symbol.key] = symbol;
        }
        else if (line.indexOf("->") >= 0) {
            var ann = getAnnotation(line);
            if (ann) {
                line = line.replace("@" + ann, "");
            }
            // flow
            var flowSymbols = line.split("->");
            for (var iS = 0, lenS = flowSymbols.length; iS < lenS; iS++) {
                var flowSymb = flowSymbols[iS];
                var symbVal = getSymbolValue(flowSymb);
                if (symbVal === "true" || symbVal === "false") {
                    // map true or false to yes or no respectively
                    flowSymb = flowSymb.replace("true", "yes");
                    flowSymb = flowSymb.replace("false", "no");
                }
                var next = getNextPath(flowSymb);
                var realSymb = getSymbol(flowSymb);
                var direction = null;
                if (next.indexOf(",") >= 0) {
                    var condOpt = next.split(",");
                    next = condOpt[0];
                    direction = condOpt[1].trim();
                }
                if (ann) {
                    if (next == "yes" || next == "true")
                        realSymb.yes_annotation = ann;
                    else
                        realSymb.no_annotation = ann;
                    ann = null;
                }
                if (!chart.start) {
                    chart.start = realSymb;
                }
                if (iS + 1 < lenS) {
                    var nextSymb = flowSymbols[iS + 1];
                    realSymb[next] = getSymbol(nextSymb);
                    realSymb["direction_" + next] = direction;
                    direction = null;
                }
            }
        }
        else if (line.indexOf("@>") >= 0) {
            // line style
            var lineStyleSymbols = line.split("@>");
            for (var iSS = 0, lenSS = lineStyleSymbols.length; iSS < lenSS; iSS++) {
                if (iSS + 1 !== lenSS) {
                    var curSymb = getSymbol(lineStyleSymbols[iSS]);
                    var nextSymbol = getSymbol(lineStyleSymbols[iSS + 1]);
                    curSymb["lineStyle"][nextSymbol.key] = JSON.parse(getStyle(lineStyleSymbols[iSS + 1]));
                }
            }
        }
    }
    return chart;
};
