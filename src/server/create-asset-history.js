const createAssetHistory = (startPrice, length, returnArray, surgeTime, surgeDirection) => {
  if(returnArray.length === length) return returnArray.reverse();
  if(surgeTime === 0){
    const newPrice = returnArray[returnArray.length - 1] + (Math.random() < .5 ? -.0001 : .0001);
    returnArray.push(newPrice);
    if(Math.random() < .05) {
      surgeTime = Math.floor(Math.random() * 50);
      surgeDirection = Math.floor(Math.random() * 2)
    }
    return createAssetHistory(startPrice, length, returnArray, surgeTime, surgeDirection)
  }
  else {
    if(surgeDirection === 1){
      const newPrice = returnArray[returnArray.length - 1] + (Math.random() < .2 ? -.0001 : .0001);
      returnArray.push(newPrice);
      surgeTime--;
      return createAssetHistory(startPrice, length, returnArray, surgeTime, surgeDirection)
    } else {
      const newPrice = returnArray[returnArray.length - 1] + (Math.random() < .8 ? -.0001 : .0001);
      returnArray.push(newPrice);
      surgeTime--;
      return createAssetHistory(startPrice, length, returnArray, surgeTime, surgeDirection)
    }
  }
}

const createHistory = (assets, length, surgeTime, cb) => {
  const history = {};
  assets.map(asset => {    
    history[asset.id] = createAssetHistory(asset.price, length, [asset.price], surgeTime, 0);
    return;
  });
  cb();
  return history;
}

module.exports = createHistory;
