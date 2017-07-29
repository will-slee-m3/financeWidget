const measures = require('./measures').measures

const returnSortedArray = (assets, history, time, measure, filter) => assets.map(o =>
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

const sortAssets = (assets, assetsHistory, time, measure, filter) => {
  const sortedArray = returnSortedArray(assets, assetsHistory, time, measure, filter)
  const filterArray = filter ?
    assets.map(asset => asset[filter]).filter((filter, index, orig) => index === orig.indexOf(filter)) :
    null ;
  return assets.map(asset => {
    const index = sortedArray.filter(element => {
      if(!filter) return true
      return element[filter] === asset[filter]
    }).map(element => element.id).indexOf(asset.id);
    if(filterArray) console.log(filterArray.length, filterArray.indexOf(asset[filter]))
    return Object.assign(
        {},
        asset,
        {
          price: asset.price.toFixed(4),
          animate: measure !== 'default',
          top: 200 * index + 40,
          width: !filter ? '100%' : `${1 / filterArray.length * 100}%`,
          left: !filter ? 0 : `${1 / filterArray.length * 100 * filterArray.indexOf(asset[filter])}%`,
          sortTag: measure !== 'default' ? `${measures[measure].tag} in the last ${time}s` : null,
          sortField: measures[measure].method(assetsHistory[asset.id], time).toFixed(4),
          index,
        }
      )
  })
}

module.exports = sortAssets;
