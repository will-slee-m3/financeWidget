import React, { Component, PropTypes } from 'react';
import {
  AssetButton,
  FilterBar,
} from '../../components';

export default class Animated extends Component {

  render() {
    const { data, filters } = this.props;
    return (
      <div>
        <FilterBar
          filters={filters}
        />
        {this.props.data.map((asset, index) => (
          <div key={asset.id}
               style={{
                 transition: '.3s',
                 top: asset.top,
                 position: 'absolute',
                 width: asset.width,
                 left: asset.left,
               }}
          >
            <AssetButton
              asset={asset}
            />
          </div>
        ))}
      </div>
    );
  }
}
