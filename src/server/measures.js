const measures = {
  change: {
    method: (history, time) => (history[history.length - 1] / history[history.length - 1 - time] - 1) * 100,
    tag: 'Change',
  },
  volatility: {
    method: (history, time) => {
      const period = history.filter((_, i) => i < history.length && i >= history.length - time);
      return (period.reduce((a, b) => Math.max(a, b)) / period.reduce((a, b) => Math.min(a, b)) - 1) * 100;
    },
    tag: 'Volatility',
  },
  average: {
    method: (history, time) => {
      const period = history.filter((_, i) => i < history.length && i >= history.length - time);
      return period.reduce((a, b) => a + b) / period.length
    },
    tag: 'Average price',
  },
  distanceFromAverage: {
    method: (history, time) => {
      const period = history.filter((_, i) => i < history.length && i >= history.length - time);
      return history[history.length - 1] - period.reduce((a, b) => a + b) / period.length
    },
    tag: 'Price from average',
  },
  default: {
    method: (history, time) => history[history.length - 1],
    tag: 'None',
  }
}

module.exports = {
  measures,
  measureSelectionOptions: Object.keys(measures).map(key => ({ key, tag: measures[key].tag })),
};
