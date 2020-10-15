import FlowChartSymbol from "./symbol";
import FlowChart from "../chart";
import { Direction, SymbolOptions } from "../options";
export interface ConditionSymbolOptions extends SymbolOptions {
    yes_annotation?: string;
    no_annotation?: string;
    direction_yes?: Direction;
    direction_no?: Direction;
}
export default class Condition extends FlowChartSymbol {
    /** Yes text */
    yes_annotation?: string;
    /** No text */
    no_annotation?: string;
    yes_direction: Direction;
    no_direction: Direction;
    textMargin: number;
    yes_symbol?: FlowChartSymbol;
    no_symbol?: FlowChartSymbol;
    bottom_symbol?: FlowChartSymbol;
    right_symbol?: FlowChartSymbol;
    left_symbol?: FlowChartSymbol;
    pathOk?: boolean;
    params: Record<string, string>;
    yes?: (nextSymbol: FlowChartSymbol) => FlowChartSymbol;
    no?: (nextSymbol: FlowChartSymbol) => FlowChartSymbol;
    constructor(chart: FlowChart, options?: ConditionSymbolOptions);
    render(): void;
    renderLines(): void;
}
