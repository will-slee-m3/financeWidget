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
        <h4 style={styles.barTitle}>Select Filter</h4>
        {!filterSelectionOptions ?
          `Retrieving filters from the cobblers...` :
          filterSelectionOptions.map(element =>
            <div style={Object.assign(
                {},
                styles.filterCard,
                {
                  backgroundColor: element === selectedFilter ? 'blue' : 'white',
                  color: element === selectedFilter ? 'white' : 'black',
                }
              )}
              onClick={() => toggleFilter(element)}
            >
              <div>{element}</div>
            </div>
          )
        }
      </div>
    );
  }
}
