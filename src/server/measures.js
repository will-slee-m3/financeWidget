const measures = {
  change: {
    method: (history, time) => history[history.length - 1] - history[history.length - 1 - time],
    tag: 'Change',
  }
}

module.exports = measures;
