import React, { PropTypes, Component } from 'react';
import styles from './styles.js';

export default class FilterSelectionBar extends Component {

  render() {
    const {
      filterSelectionOptions,
      toggleFilter,
      selectedFilter
    } = this.props;
    return (
      <div style={styles.bar}>
        <div style={styles.barTitle}>Select Filter</div>
        {!filterSelectionOptions ?
          `Retrieving filters from the cobblers...` :
          filterSelectionOptions.map(element =>
            <div style={Object.assign(
                {},
                styles.filterCard,
                {
                  width: `${1 / filterSelectionOptions.length * 100}%`,
                  backgroundColor: element.toLowerCase() === selectedFilter ? 'blue' : 'white',
                  color: element.toLowerCase() === selectedFilter ? 'white' : 'black',
                }
              )}
              onClick={() => toggleFilter(element.toLowerCase())}
            >
              <div style={styles.filterCardText}>{element}</div>
            </div>
          )
        }
      </div>
    );
  }
}
