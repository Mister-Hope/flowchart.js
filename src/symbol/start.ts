import { DrawOptions } from "../options";
import FlowChartSymbol from "./util";
import FlowChart from "../chart";

export default class Start extends FlowChartSymbol {
  constructor(chart: FlowChart, options: DrawOptions = {}) {
    const symbol = chart.paper.rect(0, 0, 0, 0, 20);
    options.text = options.text || "Start";
    super(chart, options, symbol);
  }
}
