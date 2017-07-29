import React, { Component, PropTypes } from 'react';
import {
  AssetButton
} from '../../components';

export default class Animated extends Component {

  render() {
    const { data } = this.props;
    return (
      <div>
        {this.props.data.map((asset, index) => (
          <div key={asset.id}
               style={{
                 transition: '.3s',
                 top: asset.top,
                 position: 'absolute',
                 width: '100%'
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
