import { SymbolOptions } from "../options";
import FlowChartSymbol from "./symbol";
import FlowChart from "../chart";
export default class Operation extends FlowChartSymbol {
    then?: (nextSymbol: FlowChartSymbol) => FlowChartSymbol;
    constructor(chart: FlowChart, options?: SymbolOptions);
}
