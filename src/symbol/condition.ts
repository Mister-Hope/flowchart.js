import FlowChartSymbol from "./util";
import { drawPath } from "../action";
import FlowChart from "../chart";
import { Direction } from "./util";
import { SymbolOptions } from "../options";

export interface ConditionSymbolOptions extends SymbolOptions {
  yes_annotation?: string;
  no_annotation?: string;
  direction_yes?: Direction;
  direction_no?: Direction;
}

export default class Condition extends FlowChartSymbol {
  /** Yes text */
  yes_annotation: string;
  /** No text */
  no_annotation: string;

  yes_direction: Direction;

  no_direction: Direction;

  textMargin: number;

  yes_symbol?: FlowChartSymbol;

  no_symbol?: FlowChartSymbol;
  bottom_symbol?: FlowChartSymbol;
  right_symbol?: FlowChartSymbol;
  left_symbol?: FlowChartSymbol;

  constructor(chart: FlowChart, options: ConditionSymbolOptions = {}) {
    super(chart, options);
    this.yes_annotation = options.yes_annotation;
    this.no_annotation = options.no_annotation;
    this.textMargin = this.getAttr("text-margin") as number;
    this.params = options.params;

    let { direction_yes: yesDirection, direction_no: noDirection } = options;

    if (!noDirection && yesDirection === "right") noDirection = "bottom";
    else if (!yesDirection && noDirection === "bottom") yesDirection = "right";

    this.yes_direction = yesDirection || "bottom";
    this.no_direction = noDirection || "right";

    this.text.attr({ x: this.textMargin * 2 });

    let width = this.text.getBBox().width + 3 * this.textMargin;
    width += width / 2;
    let height = this.text.getBBox().height + 2 * this.textMargin;
    height += height / 2;
    height = Math.max(width * 0.5, height);
    const startX = width / 4;
    const startY = height / 4;

    this.text.attr({
      x: startX + this.textMargin / 2,
    });

    const start = { x: startX, y: startY };
    const points = [
      { x: startX - width / 4, y: startY + height / 4 },
      {
        x: startX - width / 4 + width / 2,
        y: startY + height / 4 + height / 2,
      },
      { x: startX - width / 4 + width, y: startY + height / 4 },
      {
        x: startX - width / 4 + width / 2,
        y: startY + height / 4 - height / 2,
      },
      { x: startX - width / 4, y: startY + height / 4 },
    ];

    const symbol = drawPath(chart, start, points);

    symbol.attr({
      stroke: this.getAttr<string>("element-color"),
      "stroke-width": this.getAttr<number>("line-width"),
      fill: this.getAttr<string>("fill"),
    });

    if (options.link) symbol.attr("href", options.link);
    if (options.target) symbol.attr("target", options.target);
    if (options.key) symbol.node.id = options.key;

    symbol.node.setAttribute("class", this.getAttr("class") as string);

    this.text.attr({
      y: symbol.getBBox().height / 2,
    });

    this.group.push(symbol);
    symbol.insertBefore(this.text);

    this.initialize();
  }

  render(): void {
    if (this.yes_direction)
      this[`${this.yes_direction}_symbol`] = this.yes_symbol;

    if (this.no_direction) this[`${this.no_direction}_symbol`] = this.no_symbol;

    const lineLength = this.getAttr<number>("line-length");

    if (this.bottom_symbol) {
      const bottomPoint = this.getBottom();

      if (!this.bottom_symbol.isPositioned) {
        this.bottom_symbol.shiftY(this.getY() + this.height + lineLength);
        this.bottom_symbol.setX(bottomPoint.x - this.bottom_symbol.width / 2);
        this.bottom_symbol.isPositioned = true;
        this.bottom_symbol.render();
      }
    }

    if (this.right_symbol) {
      const rightPoint = this.getRight();

      if (!this.right_symbol.isPositioned) {
        this.right_symbol.setY(rightPoint.y - this.right_symbol.height / 2);
        this.right_symbol.shiftX(
          this.group.getBBox().x + this.width + lineLength
        );

        const self = this;
        (function shift() {
          let hasSymbolUnder = false;
          let symb;
          for (let i = 0, len = self.chart.symbols.length; i < len; i++) {
            symb = self.chart.symbols[i];

            if (
              !self.params["align-next"] ||
              self.params["align-next"] !== "no"
            ) {
              const diff = Math.abs(
                symb.getCenter().x - self.right_symbol.getCenter().x
              );

              if (
                symb.getCenter().y > self.right_symbol.getCenter().y &&
                diff <= self.right_symbol.width / 2
              ) {
                hasSymbolUnder = true;
                break;
              }
            }
          }

          if (hasSymbolUnder) {
            if (self.right_symbol.symbolType === "end") return;
            self.right_symbol.setX(symb.getX() + symb.width + lineLength);
            shift();
          }
        })();

        this.right_symbol.isPositioned = true;

        this.right_symbol.render();
      }
    }

    if (this.left_symbol) {
      const leftPoint = this.getLeft();

      if (!this.left_symbol.isPositioned) {
        this.left_symbol.setY(leftPoint.y - this.left_symbol.height / 2);
        this.left_symbol.shiftX(
          -(this.group.getBBox().x + this.width + lineLength)
        );
        const self = this;
        (function shift() {
          let hasSymbolUnder = false;
          let symb;
          for (let i = 0, len = self.chart.symbols.length; i < len; i++) {
            symb = self.chart.symbols[i];

            if (
              !self.params["align-next"] ||
              self.params["align-next"] !== "no"
            ) {
              const diff = Math.abs(
                symb.getCenter().x - self.left_symbol.getCenter().x
              );
              if (
                symb.getCenter().y > self.left_symbol.getCenter().y &&
                diff <= self.left_symbol.width / 2
              ) {
                hasSymbolUnder = true;
                break;
              }
            }
          }

          if (hasSymbolUnder) {
            if (self.left_symbol.symbolType === "end") return;
            self.left_symbol.setX(symb.getX() + symb.width + lineLength);
            shift();
          }
        })();

        this.left_symbol.isPositioned = true;

        this.left_symbol.render();
      }
    }
  }

  renderLines(): void {
    if (this.yes_symbol)
      this.drawLineTo(
        this.yes_symbol,
        this.yes_annotation || (this.getAttr("yes-text") as string),
        this.yes_direction
      );

    if (this.no_symbol)
      this.drawLineTo(
        this.no_symbol,
        this.no_annotation || (this.getAttr("yes-text") as string),
        this.no_direction
      );
  }
}
