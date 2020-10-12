import FlowChartSymbol from "./util";
import { DrawOptions } from "../options";
import FlowChart from "../chart";
export default class Parallel extends FlowChartSymbol {
    constructor(chart: FlowChart, options?: DrawOptions);
    render(): void;
    renderLines(): void;
}
