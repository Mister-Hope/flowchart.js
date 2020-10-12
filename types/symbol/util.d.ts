import { RaphaelElement } from "raphael";
export default class FlowChartSymbol {
    text: SVGGraphicsElement;
    constructor(chart: any, options: any, symbol?: RaphaelElement<"SVG" | "VML", Element | SVGRectElement>);
    getAttr(attName: any): any;
    initialize(): void;
    getCenter(): {
        x: any;
        y: any;
    };
    getX(): any;
    getY(): any;
    shiftX(x: any): void;
    setX(x: any): void;
    shiftY(y: any): void;
    setY(y: any): void;
    getTop(): {
        x: any;
        y: any;
    };
    getBottom(): {
        x: any;
        y: any;
    };
    getLeft(): {
        x: any;
        y: any;
    };
    getRight(): {
        x: any;
        y: any;
    };
    render(): void;
    renderLines(): void;
    drawLineTo(symbol: any, text: any, origin: any): void;
}
