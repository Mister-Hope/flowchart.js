declare const FlowChart: {
    parse: (input: any) => {
        symbols: {};
        start: null;
        drawSVG: (container: any, options: any) => void;
        clean: () => void;
        options: () => any;
    };
};
export = FlowChart;
