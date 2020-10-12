import FlowChartSymbol from "./util";
import FlowChart from "../chart";
import { DrawOptions } from "../options";
export default class InputOutput extends FlowChartSymbol {
    textMargin: number;
    constructor(chart: FlowChart, options?: DrawOptions);
    getLeft(): Position;
    getRight(): {
        x: number;
        y: number;
    };
}
