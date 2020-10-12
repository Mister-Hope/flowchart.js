"use strict";
var parse_1 = require("./parse");
var flowChart = { parse: parse_1.parse };
if (typeof window !== "undefined") {
    window.flowchart = flowChart;
}
module.exports = flowChart;
