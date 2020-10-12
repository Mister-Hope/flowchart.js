import { RaphaelElement, RaphaelSet } from "raphael";
import { SymbolType } from "../options";
import Flowchart from "../chart";
export declare type Direction = "top" | "right" | "left" | "bottom";
export interface Position {
    x: number;
    y: number;
}
export default class FlowChartSymbol {
    chart: Flowchart;
    text: RaphaelElement<"SVG" | "VML", Element | SVGTextElement>;
    connectedTo: FlowChartSymbol[];
    group: RaphaelSet<"SVG" | "VML">;
    symbol?: RaphaelElement<"SVG" | "VML", Element | SVGRectElement>;
    symbolType: SymbolType;
    flowstate: string;
    key: string;
    lineStyle: Record<string, any>;
    leftLines: any[];
    rightLines: any[];
    topLines: any[];
    bottomLines: any[];
    next_direction: Direction | undefined;
    constructor(chart: Flowchart, options: Record<string, any>, symbol?: RaphaelElement<"SVG" | "VML", Element | SVGRectElement>);
    getAttr<T = string | number>(attName: string): T | "";
    initialize(): void;
    getCenter(): Position;
    getX(): number;
    getY(): number;
    shiftX(x: any): void;
    setX(x: any): void;
    shiftY(y: any): void;
    setY(y: any): void;
    getTop(): {
        x: number;
        y: number;
    };
    getBottom(): {
        x: number;
        y: any;
    };
    getLeft(): {
        x: number;
        y: number;
    };
    getRight(): {
        x: number;
        y: number;
    };
    render(): void;
    renderLines(): void;
    drawLineTo(symbol: FlowChartSymbol, text: any, direction: Direction): void;
}
