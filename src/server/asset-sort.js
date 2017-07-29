const measures = require('./measures')

const returnSortedArray = (assets, history, time, measure) => assets.map(o =>
  Object.assign
    (
      {},
      o,
      {
        sortField: measures[measure].method(history[o.id], time)
      }
    )
  )
  .sort((a, b) => a.sortField - b.sortField)
  .map(newObj => newObj.id)

const sortAssets = (assets, assetsHistory, time, measure) => assets.map(
  asset => {
    const index = returnSortedArray(assets, assetsHistory, time, measure).indexOf(asset.id);    
    return Object.assign(
        {},
        asset,
        {
          top: 200 * index + 40,
          sortTag: `${measures[measure].tag} in the last ${time}s`,
          sortField: measures[measure].method(assetsHistory[asset.id], time).toFixed(4),
          index,
        }
      )
  })


module.exports = sortAssets;
