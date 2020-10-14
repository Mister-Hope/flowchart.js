import FlowChartSymbol from "./util";
import FlowChart from "../chart";
import { SymbolOptions } from "../options";
import { Position } from "./util";
export default class InputOutput extends FlowChartSymbol {
    then?: (nextSymbol: FlowChartSymbol) => FlowChartSymbol;
    textMargin: number;
    constructor(chart: FlowChart, options?: SymbolOptions);
    getLeft(): Position;
    getRight(): {
        x: number;
        y: number;
    };
}
