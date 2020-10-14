import FlowChartSymbol from "./util";
import FlowChart from "../chart";
import { SymbolOptions } from "../options";
export default class InputOutput extends FlowChartSymbol {
    textMargin: number;
    constructor(chart: FlowChart, options?: SymbolOptions);
    getLeft(): Position;
    getRight(): {
        x: number;
        y: number;
    };
}
