const measures = {
  change: {
    method: (history, time) => history[history.length - 1] - history[history.length - 1 - time],
    tag: 'Change',
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
