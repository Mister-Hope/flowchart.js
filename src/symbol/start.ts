import { SymbolOptions } from "../options";
import FlowChartSymbol from "./symbol";
import FlowChart from "../chart";

export default class Start extends FlowChartSymbol {
  then?: (nextSymbol: FlowChartSymbol) => FlowChartSymbol;
  constructor(chart: FlowChart, options: SymbolOptions = {}) {
    const symbol = chart.paper.rect(0, 0, 0, 0, 20);
    options.text = options.text || "Start";
    super(chart, options, symbol);
  }
}
