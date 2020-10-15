import FlowChartSymbol from "./symbol";
import { SymbolOptions } from "../options";
import FlowChart from "../chart";
export default class Subroutine extends FlowChartSymbol {
    then?: (nextSymbol: FlowChartSymbol) => FlowChartSymbol;
    constructor(chart: FlowChart, options?: SymbolOptions);
}
