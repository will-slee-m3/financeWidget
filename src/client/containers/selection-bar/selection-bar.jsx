import React, { Component, PropTypes } from 'react';
import {
  AssetSelectionBar,
  FilterSelectionBar,
  MeasureSelectionBar,
} from '../../components';
import FaClose from 'react-icons/lib/fa/close';
import styles from './styles';

const returnTop = (top, hidden, selectedSelectionBar) => {
  if(hidden) return '100%'
  if(top && selectedSelectionBar === 0) return '50%'
  if(top) return '75%'
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
      timeFrame,
      changeTimeFrame,
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
        <div style={styles.topSection}>
          {
            selections.map((m, index) =>
              <div onClick={() => this.setState({ selectedSelectionBar: index })}
                   style={Object.assign(
                     {},
                     styles.selectionOptionSelector,
                     {
                       backgroundColor: selectedSelectionBar === index ? 'blue' : null,
                       color: selectedSelectionBar === index ? 'white' : null
                     }
                   )}
               >{m}</div>
            )
          }
          <div style={{ float: 'right', margin: 30 }}
             onClick={toggleSelectionBar}
           >Hide</div>
        </div> :
        null
      }
      <div style={ Object.assign({},
                   styles.selectionOption,
                   {
                     left: top ? `${(0 - selectedSelectionBar) * 100}%` : 0,
                     top: top ? 80 : 0,
                   })}>
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
              changeTimeFrame={changeTimeFrame}
              timeFrame={timeFrame}
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
