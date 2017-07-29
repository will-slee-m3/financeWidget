import React, { Component, PropTypes } from 'react';
import {
  AssetSelectionBar,
  FilterSelectionBar,
} from '../../components';
import styles from './styles';

export default class SelectionBar extends Component {

  render() {
    const {
      data,
      top,
      toggleAssetSelection,
      selectedAssets,
      selectedFilter,
      filters,
      toggleFilter,
    } = this.props;
    return (
      <div style={Object.assign(
        {},
        styles.container,
        {
          position: 'fixed',
          top: top ? '70%' : 0,
          transition: '1s',
          height: '100%',
        }
      )}>
        <AssetSelectionBar
          data={data}
          selectedAssets={selectedAssets}
          toggleAssetSelection={toggleAssetSelection}
          selectedAssets={selectedAssets}
        />
        <FilterSelectionBar
          selectedFilter={selectedFilter}
          filters={filters}
          toggleFilter={toggleFilter}
        />
      </div>
    );
  }
}
