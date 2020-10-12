import FlowChartSymbol from "./util";
import { drawPath } from "../action";

export default class InputOutput extends FlowChartSymbol {
  constructor(chart, options = {}) {
    super(chart, options);
    this.textMargin = this.getAttr("text-margin");

    this.text.attr({
      x: this.textMargin * 3,
    });

    const width = this.text.getBBox().width + 4 * this.textMargin;
    const height = this.text.getBBox().height + 2 * this.textMargin;
    const startX = this.textMargin;
    const startY = height / 2;

    const start = { x: startX, y: startY };
    const points = [
      { x: startX - this.textMargin, y: height },
      { x: startX - this.textMargin + width, y: height },
      { x: startX - this.textMargin + width + 2 * this.textMargin, y: 0 },
      { x: startX - this.textMargin + 2 * this.textMargin, y: 0 },
      { x: startX, y: startY },
    ];

    const symbol = drawPath(chart, start, points);

    symbol.attr({
      stroke: this.getAttr("element-color"),
      "stroke-width": this.getAttr("line-width"),
      fill: this.getAttr("fill"),
    });
    if (options.link) {
      symbol.attr("href", options.link);
    }
    if (options.target) {
      symbol.attr("target", options.target);
    }
    if (options.key) {
      symbol.node.id = options.key;
    }
    symbol.node.setAttribute("class", this.getAttr("class"));

    this.text.attr({
      y: symbol.getBBox().height / 2,
    });

    this.group.push(symbol);
    symbol.insertBefore(this.text);

    this.initialize();
  }

  getLeft() {
    const y = this.getY() + this.group.getBBox().height / 2;
    const x = this.getX() + this.textMargin;
    return { x: x, y: y };
  }

  getRight() {
    const y = this.getY() + this.group.getBBox().height / 2;
    const x = this.getX() + this.group.getBBox().width - this.textMargin;
    return { x: x, y: y };
  }
}
