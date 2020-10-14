import FlowChartSymbol from "./util";
import { SymbolOptions } from "../options";
import FlowChart from "../chart";

export default class Subroutine extends FlowChartSymbol {
  constructor(chart: FlowChart, options: SymbolOptions = {}) {
    const symbol = chart.paper.rect(0, 0, 0, 0);
    super(chart, options, symbol);

    symbol.attr({
      width: this.text.getBBox().width + 4 * this.getAttr("text-margin"),
    });

    this.text.attr({
      x: 2 * this.getAttr("text-margin"),
    });

    const innerWrap = chart.paper.rect(0, 0, 0, 0);
    innerWrap.attr({
      x: this.getAttr("text-margin"),
      stroke: this.getAttr("element-color"),
      "stroke-width": this.getAttr("line-width"),
      width: this.text.getBBox().width + 2 * this.getAttr("text-margin"),
      height: this.text.getBBox().height + 2 * this.getAttr("text-margin"),
      fill: this.getAttr("fill"),
    });
    if (options.key) {
      innerWrap.node.id = options.key + "i";
    }

    const font = this.getAttr("font");
    const fontF = this.getAttr("font-family");
    const fontW = this.getAttr("font-weight");

    if (font) innerWrap.attr({ font: font });
    if (fontF) innerWrap.attr({ "font-family": fontF });
    if (fontW) innerWrap.attr({ "font-weight": fontW });

    if (options.link) {
      innerWrap.attr("href", options.link);
    }
    if (options.target) {
      innerWrap.attr("target", options.target);
    }
    this.group.push(innerWrap);
    innerWrap.insertBefore(this.text);

    this.initialize();
  }
}
