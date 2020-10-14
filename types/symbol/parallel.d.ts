import FlowChartSymbol from "./util";
import { Direction, SymbolOptions } from "../options";
import FlowChart from "../chart";
export default class Parallel extends FlowChartSymbol {
    path1_direction: Direction;
    path1_symbol?: FlowChartSymbol;
    path2_direction: Direction;
    path2_symbol?: FlowChartSymbol;
    path3_direction: Direction;
    path3_symbol?: FlowChartSymbol;
    pathOk?: boolean;
    path1?: (nextSymbol: FlowChartSymbol) => FlowChartSymbol;
    path2?: (nextSymbol: FlowChartSymbol) => FlowChartSymbol;
    path3?: (nextSymbol: FlowChartSymbol) => FlowChartSymbol;
    textMargin?: number;
    params: Record<string, string>;
    top_symbol?: FlowChartSymbol;
    bottom_symbol?: FlowChartSymbol;
    left_symbol?: FlowChartSymbol;
    right_symbol?: FlowChartSymbol;
    constructor(chart: FlowChart, options?: SymbolOptions);
    render(): void;
    renderLines(): void;
}
