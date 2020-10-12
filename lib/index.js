"use strict";
var parse_1 = require("./parse");
var FlowChart = { parse: parse_1.parse };
if (typeof window !== "undefined") {
    window.flowchart = FlowChart;
}
module.exports = FlowChart;
