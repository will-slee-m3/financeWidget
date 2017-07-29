const express = require('express');
const WebSocket = require('ws');
const enableWs = require('express-ws');
const path = require('path');

const assets = require('./create-assets');
const createHistory = require('./create-asset-history');
const priceEmitter = require('./asset-price-emitter');
const sortAssets = require('./asset-sort');
const measureSelectionOptions = require('./measures').measureSelectionOptions;
const app = express();

enableWs(app);

assetsHistory = createHistory(assets, 5000, 100, () => assets.map(a => priceEmitter(a, 0, 0, 4000, 2000)));

assets.map(asset => setInterval(() => assetsHistory[asset.id].push(asset.price), 1000));

app.use(express.static(path.join(__dirname, '../../')));

app.get('/', (_, res) => {
  res.sendFile(path.resolve(__dirname, '../../index.html'))
});

// let selectedAssets = [assets[0]];
let selectedAssets = [];

let filter = null;
let measure = null;
const masterAssetList = sortAssets(assets, assetsHistory, 10, measure || 'default', filter);

app.ws('/connect', (ws, req) => {
  console.log('Connection to webSocket successful...')
  ws.send(JSON.stringify({
    assets: assets,
    measureSelectionOptions: measureSelectionOptions.filter(option => option.key !== 'default'),
  }), (err) => {
      if(err) broadcast = false;
  })
  setInterval(() => {
    ws.send(JSON.stringify({
      sorted: sortAssets(selectedAssets, assetsHistory, 10, measure || 'default', filter)
    }), (err) => {
        if(err) broadcast = false;
    })
  },
  1000)

  ws.on('message', (objStr) => {
    const message = JSON.parse(objStr);
    console.log('recevied message!', message)
    if(Object.keys(message)[0] === 'selectionUpdate') {
      if(message.add) {
        selectedAssets.push(assets[assets.map(asset => asset.id).indexOf(message.selectionUpdate)]);
        ws.send(JSON.stringify({
          sorted: sortAssets(selectedAssets, assetsHistory, 10, measure || 'default', filter),
          filters: filter ? selectedAssets.map(asset => asset[filter]).filter((filter, index, orig) => index === orig.indexOf(filter)) : [],
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
          sorted: sortAssets(selectedAssets, assetsHistory, 10, measure || 'default', filter),
          filters: filter ? selectedAssets.map(asset => asset[filter]).filter((filter, index, orig) => index === orig.indexOf(filter)) : [],
        }), (err) => {
            if(err) broadcast = false;
        })
      }
    }
    if(Object.keys(message)[0] === 'filterUpdate') {
      filter = message.filterUpdate;
      ws.send(JSON.stringify({
        sorted: sortAssets(selectedAssets, assetsHistory, 10, measure || 'default', filter),
        filters: filter ?
          selectedAssets.map(
            asset => asset[filter]
          )
          .filter((filter, index, orig) => index === orig.indexOf(filter))
          .sort() :
        [],
      }), (err) => {
          if(err) broadcast = false;
      })
    }
    if(Object.keys(message)[0] === 'measureUpdate') {
      measure = message.measureUpdate;
      ws.send(JSON.stringify({
        sorted: sortAssets(selectedAssets, assetsHistory, 10, measure || 'default', filter),
      }), (err) => {
          if(err) broadcast = false;
      })
    }
  })
})

app.listen(3000, () => {
  console.log('listening on 3000');
})
