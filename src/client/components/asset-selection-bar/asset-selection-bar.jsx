import React, { PropTypes, Component } from 'react';
import styles from './styles.js';

export default class AssetSelectionBar extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectAllBackgroundColor: 'white',
      selectAllTextColor: 'black',
    }
    this.selectAllAssets = this.selectAllAssets.bind(this);
  }

  selectAllAssets() {

  }

  render() {
    const {
      data,
      toggleAssetSelection,
      selectAssets,
      selectedAssets,
      toggleSelectAllAssets,
    } = this.props;
    const {
      selectAllBackgroundColor,
      selectAllTextColor,
    } = this.state;
    const displayArray = [];
    if(data) data.map((_, i) => {
      if((i + 1) % 10 === 0) {
        displayArray.push(data.slice(i - 9, i + 1));
      }
    })
    return (
      <div style={styles.bar}>
        <div style={styles.barTitle}>Add asset</div>
        {
          data ?
          <div style={Object.assign(
            {},
            styles.selectAll,
            {
              backgroundColor: selectAllBackgroundColor,
              color: selectAllTextColor,
            }
          )}
          onClick={toggleSelectAllAssets}
          >{selectedAssets.length === data.length ? 'Remove All' : 'Select All'}</div> :
          null
        }
        <div style={Object.assign(
          {},
          styles.assetCardHolder,
          { height: selectedAssets.length === 0 ? '100%' : 500 }
        )}>
        {!data ?
          `Retrieving assets from the umbrella stand...` :
          displayArray.map(line =>
            line.map(element =>
              <div
                style={Object.assign(
                  {},
                  styles.assetCard,
                  {
                    backgroundColor: selectedAssets.indexOf(element.id) !== -1 ? 'blue' : null,
                    color: selectedAssets.indexOf(element.id) !== -1 ? 'white' : null
                  }
                )}
                onClick={() => toggleAssetSelection(element.id)}>
                  <div style={styles.assetCardText}>{element.name}</div>
              </div>
            )
          )
        }
        </div>
      </div>
    );
  }
}
