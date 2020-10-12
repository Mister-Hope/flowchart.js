import * as Raphael from "raphael";
import { merge } from "./util";
import { defaultConfig } from "./config";
import Condition from "./symbol/condition";
import Parallel from "./symbol/parallel";

export default class FlowChart {
  constructor(container, options = {}) {
    this.paper = new Raphael(container);

    this.options = merge(options, defaultConfig);

    this.symbols = [];
    this.lines = [];
    this.start = null;
  }

  handle(symbol) {
    if (this.symbols.indexOf(symbol) <= -1) {
      this.symbols.push(symbol);
    }

    const flowChart = this;

    if (symbol instanceof Condition) {
      symbol.yes = (nextSymbol) => {
        symbol.yes_symbol = nextSymbol;
        if (symbol.no_symbol) {
          symbol.pathOk = true;
        }
        return flowChart.handle(nextSymbol);
      };
      symbol.no = (nextSymbol) => {
        symbol.no_symbol = nextSymbol;
        if (symbol.yes_symbol) {
          symbol.pathOk = true;
        }
        return flowChart.handle(nextSymbol);
      };
    } else if (symbol instanceof Parallel) {
      symbol.path1 = function (nextSymbol) {
        symbol.path1_symbol = nextSymbol;
        if (symbol.path2_symbol) {
          symbol.pathOk = true;
        }
        return flowChart.handle(nextSymbol);
      };
      symbol.path2 = function (nextSymbol) {
        symbol.path2_symbol = nextSymbol;
        if (symbol.path3_symbol) {
          symbol.pathOk = true;
        }
        return flowChart.handle(nextSymbol);
      };
      symbol.path3 = function (nextSymbol) {
        symbol.path3_symbol = nextSymbol;
        if (symbol.path1_symbol) {
          symbol.pathOk = true;
        }
        return flowChart.handle(nextSymbol);
      };
    } else
      symbol.then = (nextSymbol) => {
        symbol.next = nextSymbol;
        symbol.pathOk = true;
        return flowChart.handle(nextSymbol);
      };

    return symbol;
  }

  startWith(symbol) {
    this.start = symbol;
    return this.handle(symbol);
  }

  render() {
    let maxWidth = 0,
      maxHeight = 0,
      i = 0,
      len = 0,
      maxX = 0,
      maxY = 0,
      minX = 0,
      minY = 0,
      symbol,
      line;

    for (i = 0, len = this.symbols.length; i < len; i++) {
      symbol = this.symbols[i];
      if (symbol.width > maxWidth) {
        maxWidth = symbol.width;
      }
      if (symbol.height > maxHeight) {
        maxHeight = symbol.height;
      }
    }

    for (i = 0, len = this.symbols.length; i < len; i++) {
      symbol = this.symbols[i];
      symbol.shiftX(
        this.options.x +
          (maxWidth - symbol.width) / 2 +
          this.options["line-width"]
      );
      symbol.shiftY(
        this.options.y +
          (maxHeight - symbol.height) / 2 +
          this.options["line-width"]
      );
    }

    this.start.render();

    for (i = 0, len = this.symbols.length; i < len; i++) {
      symbol = this.symbols[i];
      symbol.renderLines();
    }

    maxX = this.maxXFromLine;

    let x;
    let y;

    for (i = 0, len = this.symbols.length; i < len; i++) {
      symbol = this.symbols[i];
      const leftX = symbol.getX();
      x = leftX + symbol.width;
      y = symbol.getY() + symbol.height;
      if (leftX < minX) {
        minX = leftX;
      }
      if (x > maxX) {
        maxX = x;
      }
      if (y > maxY) {
        maxY = y;
      }
    }

    for (i = 0, len = this.lines.length; i < len; i++) {
      line = this.lines[i].getBBox();
      x = line.x;
      y = line.y;
      const x2 = line.x2;
      const y2 = line.y2;
      if (x < minX) {
        minX = x;
      }
      if (y < minY) {
        minY = y;
      }
      if (x2 > maxX) {
        maxX = x2;
      }
      if (y2 > maxY) {
        maxY = y2;
      }
    }

    const scale = this.options["scale"];
    const lineWidth = this.options["line-width"];

    if (this.minXFromSymbols < minX) minX = this.minXFromSymbols;

    if (minX < 0) minX -= lineWidth;
    if (minY < 0) minY -= lineWidth;

    const width = maxX + lineWidth - minX;
    const height = maxY + lineWidth - minY;

    this.paper.setSize(width * scale, height * scale);
    this.paper.setViewBox(minX, minY, width, height, true);
  }

  clean() {
    if (this.paper) {
      const paperDom = this.paper.canvas;
      paperDom.parentNode && paperDom.parentNode.removeChild(paperDom);
    }
  }
}
