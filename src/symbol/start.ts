import FlowChartSymbol from "./util";

export default class Start extends FlowChartSymbol {
  constructor(chart, options = {}) {
    const symbol = chart.paper.rect(0, 0, 0, 0, 20);
    options.text = options.text || "Start";
    super(chart, options, symbol);
  }
}
