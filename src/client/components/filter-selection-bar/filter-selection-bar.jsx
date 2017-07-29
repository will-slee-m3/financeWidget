import React, { PropTypes, Component } from 'react';
import styles from './styles.js';

export default class FilterSelectionBar extends Component {

  render() {
    const {
      filters,
      toggleFilter,
      selectedFilter
    } = this.props;
    return (
      <div>
        <h4>Select Filter</h4>
        {!filters ?
          `Retrieving filters from the cobblers...` :
          filters.map(element =>
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
