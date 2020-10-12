import { RaphaelPaper, RaphaelSet } from "raphael";
import { DrawOptions } from "./options";
import FlowChartSymbol from "./symbol/util";
export default class FlowChart {
    options: DrawOptions;
    symbols: FlowChartSymbol[];
    lines: any[];
    start: null | FlowChartSymbol;
    paper: RaphaelPaper<"SVG" | "VML"> & RaphaelSet<"SVG" | "VML">;
    constructor(container: string | HTMLElement, options?: DrawOptions);
    handle(symbol: FlowChartSymbol): FlowChartSymbol;
    startWith(symbol: FlowChartSymbol): FlowChartSymbol;
    render(): void;
    clean(): void;
}
