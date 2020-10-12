import FlowChartSymbol from "./util";

export default class Operation extends FlowChartSymbol {
  constructor(chart, options = {}) {
    const symbol = chart.paper.rect(0, 0, 0, 0, 0);
    options.text = options.text || "End";
    super(chart, options, symbol);
  }
}
