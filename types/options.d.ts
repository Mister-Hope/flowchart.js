export declare type SymbolType = "start" | "end" | "operation" | "inputoutput" | "subroutine" | "condition" | "parallel";
export interface SVGOptions {
    x: number;
    y: number;
    font: string;
    "font-family": string;
    "font-weight": string;
    "line-width": number;
    "line-length": number;
    "text-margin": number;
    "font-size": number;
    "font-color": string;
    "line-color": string;
    "element-color": string;
    fill: string;
    "yes-text": string;
    "no-text": string;
    "arrow-end": string;
    scale: number;
    class: string;
    [props: string]: any;
}
export interface DrawOptions extends Partial<SVGOptions> {
    /** Stymbol Styles */
    symbols?: Record<string, Partial<SVGOptions>>;
    /** FlowState config */
    flowstate?: Record<string, Partial<SVGOptions>>;
}
export interface SymbolOptions {
    symbolType: SymbolType;
    key: string;
    text: string | null;
    link: string | null;
    target: string | null;
    flowstate: null;
    function: null;
    lineStyle: Record<string, string>;
    params: Record<string, string>;
}
