import React, { Component } from 'react';
import styles from './styles';

export default class FilterBar extends Component {

  render(){
    const { filters } = this.props;
    return (
      <div style={styles.component}>
        {filters && filters.map(filter =>
          <div style={Object.assign(
            {},
            styles.filterTag,
            { width: `${1 / filters.length * 100}%`}
          )}>
            {filter}
          </div>
        )}
      </div>
    )
  }
}
