export interface SVGOptions {
    x: number;
    y: number;
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
    symbolType: "start" | "end" | "operation" | "inputoutput" | "subroutine" | "condition" | "parallel";
    key: string;
    text: string | null;
    link: string | null;
    target: string | null;
    flowstate: null;
    function: null;
    lineStyle: Record<string, string>;
    params: Record<string, string>;
}
