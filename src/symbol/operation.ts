import { SymbolOptions } from "../options";
import FlowChartSymbol from "./util";
import FlowChart from "../chart";

export default class Operation extends FlowChartSymbol {
  then?: (nextSymbol: FlowChartSymbol) => FlowChartSymbol;
  constructor(chart: FlowChart, options: SymbolOptions = {}) {
    const symbol = chart.paper.rect(0, 0, 0, 0, 0);
    options.text = options.text || "End";
    super(chart, options, symbol);
  }
}
