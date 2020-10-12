import FlowChartSymbol from "./util";
import FlowChart from "../chart";

export default class End extends FlowChartSymbol {
  constructor(chart: FlowChart, options = {}) {
    const symbol = chart.paper.rect(0, 0, 0, 0, 20);
    options.text = options.text || "End";
    super(chart, options, symbol);
  }
}
