const priceEmitter = (asset, surgeTime, surgeDirection, normalInterval, surgeInterval) => {
  if(surgeTime === 0) {
    setTimeout(() => {
      asset['price'] = asset['price'] + (Math.random() < .5 ? -.0001 : .0001);
      if(Math.random() < .05) {
        surgeTime = Math.floor(Math.random() * 50);
        surgeDirection = Math.floor(Math.random() * 2)
      }
      priceEmitter(asset, surgeTime, surgeDirection, normalInterval, surgeInterval)
    },
      Math.floor(Math.random() * normalInterval)
    )
  } else {
    if (surgeDirection === 1) {
      setTimeout(() => {
        asset['price'] = asset['price'] + (Math.random() < .2 ? -.0001 : .0001);
        surgeTime--;
        priceEmitter(asset, surgeTime, surgeDirection, normalInterval, surgeInterval)
      },
        Math.floor(Math.random() * surgeInterval)
      )
    } else {
      setTimeout(() => {
        asset['price'] = asset['price'] + (Math.random() < .8 ? -.0001 : .0001);
        surgeTime--;
        priceEmitter(asset, surgeTime, surgeDirection, normalInterval, surgeInterval)
      },
        Math.floor(Math.random() * surgeInterval)
      )
    }
  }
}

module.exports = priceEmitter;
