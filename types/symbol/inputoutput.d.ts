import Symbol from "./util";
export default class InputOutput extends Symbol {
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
