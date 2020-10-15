import { RaphaelPaper, RaphaelSet, RaphaelPath } from "raphael";
import { ParsedDrawOptions } from "./options";
import FlowChartSymbol from "./symbol/symbol";
export default class FlowChart {
    options: ParsedDrawOptions;
    symbols: FlowChartSymbol[];
    lines: RaphaelPath<"SVG" | "VML">[];
    start: null | FlowChartSymbol;
    paper: RaphaelPaper<"SVG" | "VML"> & RaphaelSet<"SVG" | "VML">;
    minXFromSymbols?: number;
    maxXFromLine?: number;
    constructor(container: string | HTMLElement, options: ParsedDrawOptions);
    handle(symbol: FlowChartSymbol): FlowChartSymbol;
    startWith(symbol: FlowChartSymbol): FlowChartSymbol;
    render(): void;
    clean(): void;
}
