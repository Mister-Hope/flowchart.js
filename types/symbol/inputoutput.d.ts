import FlowChartSymbol from "./util";
export default class InputOutput extends FlowChartSymbol {
    constructor(chart: any, options?: {});
    getLeft(): {
        x: any;
        y: any;
    };
    getRight(): {
        x: number;
        y: any;
    };
}
