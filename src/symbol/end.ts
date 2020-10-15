import FlowChartSymbol from "./symbol";
import FlowChart from "../chart";
import { SymbolOptions } from "../options";

export default class End extends FlowChartSymbol {
  then?: (nextSymbol: FlowChartSymbol) => FlowChartSymbol;
  constructor(chart: FlowChart, options: SymbolOptions = {}) {
    const symbol = chart.paper.rect(0, 0, 0, 0, 20);
    options.text = options.text || "End";
    super(chart, options, symbol);
  }
}
