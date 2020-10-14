import FlowChartSymbol, { Direction } from "./util";
import { SymbolOptions } from "../options";
import FlowChart from "../chart";
export interface ParralSymbolOptions extends SymbolOptions {
    next?: any;
    direction_next?: Direction;
}
export default class Parallel extends FlowChartSymbol {
    path1_direction: Direction;
    path2_direction: Direction;
    path3_direction: Direction;
    constructor(chart: FlowChart, options?: ParralSymbolOptions);
    render(): void;
    renderLines(): void;
}
