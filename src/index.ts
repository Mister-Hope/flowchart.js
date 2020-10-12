import { parse } from "./parse";

const flowChart = { parse };

if (typeof window !== "undefined") {
  (window as any).flowchart = flowChart;
}

export = flowChart;
