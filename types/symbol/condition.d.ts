import FlowChartSymbol from "./util";
import FlowChart from "../chart";
import { Direction } from "./util";
import { DrawOptions } from "../options";
export default class Condition extends FlowChartSymbol {
    /** Yes text */
    yes_annotation: string;
    /** No text */
    no_annotation: string;
    yes_direction: Direction;
    constructor(chart: FlowChart, options?: DrawOptions);
    render(): void;
    renderLines(): void;
}
