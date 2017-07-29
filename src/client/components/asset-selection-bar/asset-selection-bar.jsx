import React, { PropTypes, Component } from 'react';
import styles from './styles.js';

export default class AssetSelectionBar extends Component {

  render() {
    const {
      data,
      toggleAssetSelection,
      selectAssets,
      selectedAssets
    } = this.props;
    return (
      <div>
        <h4>Add asset</h4>
        {!data ?
          `Retrieving assets from the umbrella stand...` :
          data.map(element =>
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
                <div>{element.name}</div>
                <div>{element.id}</div>
            </div>
          )
        }
      </div>
    );
  }
}
