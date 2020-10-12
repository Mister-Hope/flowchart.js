import Symbol from "./util";

export default class Start extends Symbol {
  constructor(chart, options = {}) {
    const symbol = chart.paper.rect(0, 0, 0, 0, 20);
    options.text = options.text || "Start";
    super(chart, options, symbol);
  }
}
