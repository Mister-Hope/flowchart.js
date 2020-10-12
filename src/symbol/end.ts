import Symbol from "./util";

export default class End extends Symbol {
  constructor(chart, options = {}) {
    const symbol = chart.paper.rect(0, 0, 0, 0, 20);
    options.text = options.text || "End";
    super(chart, options, symbol);
  }
}
