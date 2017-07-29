import React, { Component, PropTypes } from 'react';
import {
  AssetSelectionBar,
  FilterSelectionBar,
  MeasureSelectionBar,
} from '../../components';
import styles from './styles';

const returnTop = (top, hidden, selectedSelectionBar) => {
  if(hidden) return '100%'
  if(top && selectedSelectionBar === 0) return '50%'
  if(top) return '80%'
  return 0
}

export default class SelectionBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSelectionBar: 0,
      selections: ['Add Asset', 'Select Filter', 'Select Measure']
    }
  }
  render() {
    const {
      data,
      top,
      selectedAssets,
      selectedFilter,
      selectedMeasure,
      filters,
      measures,
      toggleAssetSelection,
      toggleFilter,
      toggleMeasure,
      toggleSelectionBar,
      filterSelectionOptions,
      measureSelectionOptions,
      hidden,
    } = this.props;
    const {
      selectedSelectionBar,
      selections,
    } = this.state;
    return (
      <div style={Object.assign(
        {},
        styles.container,
        {
          position: 'fixed',
          top: returnTop(top, hidden, selectedSelectionBar),
          transition: '.3s',
          height: '100%',
          zIndex: 999,
        }
      )}>
      {
        top ?
        selections.map((m, index) =>
          <div onClick={() => this.setState({ selectedSelectionBar: index })}
               style={{ padding: 30, width: 20, float: 'left' }}>{m}</div>
        ) :
        null
      }
      <div style={{ float: 'right', padding: 40 }}
           onClick={toggleSelectionBar}
      >X</div>
      <div style={ Object.assign({}, styles.selectionOption, {left: top ? `${(0 - selectedSelectionBar) * 100}%` : 0})}>
        <AssetSelectionBar
          data={data}
          selectedAssets={selectedAssets}
          toggleAssetSelection={toggleAssetSelection}
          selectedAssets={selectedAssets}
        />
      </div>
      {
        top ?
        <div>
          <div style={ Object.assign({}, styles.selectionOption, {left: `${(1 - selectedSelectionBar) * 100}%`})}>
            <FilterSelectionBar
              selectedFilter={selectedFilter}
              filterSelectionOptions={filterSelectionOptions}
              toggleFilter={toggleFilter}
            />
          </div>
          <div style={ Object.assign({}, styles.selectionOption, {left: `${(2 - selectedSelectionBar) * 100}%`})}>
            <MeasureSelectionBar
              selectedMeasure={selectedMeasure}
              measureSelectionOptions={measureSelectionOptions}
              toggleMeasure={toggleMeasure}
            />
          </div>
        </div> :
        null
      }
      </div>
    );
  }
}
