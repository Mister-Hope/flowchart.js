import { parse } from "./parse";

const FlowChart = { parse };

if (typeof window !== "undefined") {
  window.flowchart = FlowChart;
}

export = FlowChart;
