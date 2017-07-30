import React, { Component } from 'react';
import styles from './styles.js';

export default class MeasureSelectionBar extends Component {

  render() {
    const {
      measureSelectionOptions,
      toggleMeasure,
      selectedMeasure
    } = this.props;
    return (
      <div style={styles.bar}>
        <div style={styles.barTitle}>Select Measure</div>
        {!measureSelectionOptions ?
          `Collecting measures from the tobacconist...` :
          measureSelectionOptions.map(element =>
            <div style={Object.assign(
                {},
                styles.measureCard,
                {
                  backgroundColor: element.key === selectedMeasure ? 'blue' : 'white',
                  color: element.key === selectedMeasure ? 'white' : 'black',
                }
              )}
              onClick={() => toggleMeasure(element.key)}
            >
              <div style={styles.measureCardText}>{element.tag}</div>
            </div>
          )
        }
      </div>
    );
  }
}
