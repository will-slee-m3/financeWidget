const express = require('express');
const WebSocket = require('ws');
const enableWs = require('express-ws');
const path = require('path');

const assets = require('./create-assets');
const createHistory = require('./create-asset-history');
const priceEmitter = require('./asset-price-emitter');
const sortAssets = require('./asset-sort');
const app = express();

enableWs(app);

assetsHistory = createHistory(assets, 5000, 100, () => assets.map(a => priceEmitter(a, 0, 0, 4000, 2000)));

assets.map(asset => setInterval(() => assetsHistory[asset.id].push(asset.price), 1000));

app.use(express.static(path.join(__dirname, '../../')));

app.get('/', (_, res) => {
  res.sendFile(path.resolve(__dirname, '../../index.html'))
});

let selectedAssets = [];

const masterAssetList = sortAssets(assets, assetsHistory, 10, 'change');

let filter = null;


app.ws('/connect', (ws, req) => {
  console.log('Connection to webSocket successful...')
  ws.send(JSON.stringify({
    assets: assets
  }), (err) => {
      if(err) broadcast = false;
  })
  setInterval(() => {
    ws.send(JSON.stringify({
      sorted: sortAssets(selectedAssets, assetsHistory, 10, 'change')
    }), (err) => {
        if(err) broadcast = false;
    })
  },
  1000)

  ws.on('message', (objStr) => {
    const message = JSON.parse(objStr);
    if(Object.keys(message)[0] === 'selectionUpdate') {
      if(message.add) {
        selectedAssets.push(masterAssetList[masterAssetList.map(asset => asset.id).indexOf(message.selectionUpdate)]);
        ws.send(JSON.stringify({
          sorted: sortAssets(selectedAssets, assetsHistory, 10, 'change')
        }), (err) => {
            if(err) broadcast = false;
        })
      } else {
        selectedAssets = selectedAssets
            .slice(0, selectedAssets.map(asset => asset.id).indexOf(message.selectionUpdate))
            .concat(
              selectedAssets.slice(selectedAssets.map(asset => asset.id).indexOf(message.selectionUpdate) + 1)
            )
        ws.send(JSON.stringify({
          sorted: sortAssets(selectedAssets, assetsHistory, 10, 'change')
        }), (err) => {
            if(err) broadcast = false;
        })
      }
    }
    if(Object.keys(message)[0] === 'filterUpdate') {
      filter = message.filterUpdate;
    }
    console.log(filter);
  })
})
// const assetsPricesFunc = () => {
//   const obj = {};
//   uuidArray.map(u => obj[u] = Math.floor(Math.random() * 20000) / 10000)
//   return obj;
// }
//
// const assetsPrices = assetsPricesFunc();
//
// const assetsHistoryFunc = () => {
//   const obj = {};
//   uuidArray.map(u => obj[u] = createHistory(assetsPrices[u], 1000, [assetsPrices[u]], 0, 0))
//   return obj;
// }
//
// const assetsHistory = assetsHistoryFunc();
//
// let broadcast = false;
// let wsObject = {};
// let filter = null;
// let oldObj = null;
// let sort = null;
//
// const airTheBroadcast = (obj) => {
//   if(obj === 'newSort' && broadcast) {
//     const sortedArray = sortAssets(sort ? indicators[indicators.map(i => i.key).indexOf(sort)].key : 'default', assetsHistory, 10, assets, assetsPrices, filter ? filter.toLowerCase() : null, oldObj);
//     wsObject.send(JSON.stringify({ sortedArray }), (err) => {
//       if(err) broadcast = false;
//     })
//   } else if (broadcast) {
//     wsObject.send(JSON.stringify({[Object.keys(obj)[0]]: obj[Object.keys(obj)[0]]}), (err) => {
//       if(err) broadcast = false;
//     })
//   }
// }
//
// Object.keys(assetsHistory).map((key, i) => {
//   priceTimer(wsObject, key, 20, 0, assetsPrices, 4000, 2000, airTheBroadcast)
//   setInterval(() => assetsHistory[key] = assetsHistory[key].concat(assetsPrices[key]), 1000)
// })
//
// const intervals = [];
//
// app.ws('/connect', (ws, req) => {
//   filter = 'sector';
//   ws.send(JSON.stringify({ assets }), (err) => {
//     if(err) broadcast = false;
//   })
//   ws.send(JSON.stringify({ allFilters }), (err) => {
//     if(err) broadcast = false;
//   })
  // ws.send(JSON.stringify({ indicators }), (err) => {
  //   if(err) broadcast = false;
  // })
  // assets.map(a => ws.send(JSON.stringify({ [a.id]: assetsHistory[a.id][assetsHistory[a.id].length - 1] }), (err) => {
  //   if(err) broadcast = false
  // }))
  // if (intervals.length === 0) {
  //   intervals.push(setInterval(() => {
  //     airTheBroadcast('newSort')
  //   }, 300));
  // }
  // ws.on('message', (m) => {
  //   if(m.slice(0, 'filterBy'.length) === 'filterBy' && filter !== m.slice('filterBy'.length)) {
  //     ws.send(JSON.stringify({ assets }), (err) => {
  //       if(err) broadcast = false;
  //       filter = m.slice('filterBy'.length);
  //     })
  //   } else if (m.slice(0, 'sortBy'.length) === 'sortBy' && sort !== m.slice('sortBy'.length)) {
  //     sort = m.slice('sortBy'.length);
  //   } else {
  //     ws.send(JSON.stringify({ assets }), (err) => {
  //       if(err) broadcast = false;
  //       filter = null;
  //     })
  //   }
  // })
//   wsObject = ws;
//   broadcast = true;
// })
//
app.listen(3000, () => {
  console.log('listening on 3000');
})
