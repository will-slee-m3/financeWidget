import React, { Component } from 'react';
import styles from './styles.js';

export default class MeasureSelectionBar extends Component {

  constructor(props){
    super(props);
    this.state = {
      timeChangeBackgroundColor: 'white',
      timeChangeTextColor: 'black',
    }
  }

  handleTimeFrameChange(newTime){
    if(!(newTime <= 0)) this.props.changeTimeFrame(newTime);
    this.setState({
      timeChangeBackgroundColor: 'blue', timeChangeTextColor: 'white'
    },
    () => setTimeout(
      () => this.setState({
        timeChangeBackgroundColor: 'white', timeChangeTextColor: 'black'
      }
    ), 300)
    )
  }

  render() {
    const {
      measureSelectionOptions,
      toggleMeasure,
      selectedMeasure,
      timeFrame,
      changeTimeFrame,
    } = this.props;
    const {
      timeChangeBackgroundColor,
      timeChangeTextColor,
    } = this.state;
    return (
      <div style={styles.bar}>
        <div style={styles.barTitle}>Select Measure</div>
        <div style={Object.assign(
                      {},
                      styles.timeChange,
                      {
                        backgroundColor: timeChangeBackgroundColor,
                        color: timeChangeTextColor
                      }
                    )}
        >
          <div>Time(s)</div>
          <div style={styles.timeChangeText} onClick={() => this.handleTimeFrameChange(timeFrame + 10)}>+</div>
          <div style={styles.timeChangeText} >{timeFrame}</div>
          {
            timeFrame !== 10 ?
            <div style={styles.timeChangeText}  onClick={() => this.handleTimeFrameChange(timeFrame - 10)}>-</div> :
            null
          }
        </div>
        {!measureSelectionOptions ?
          `Collecting measures from the tobacconist...` :
          measureSelectionOptions.map(element =>
            <div style={Object.assign(
                {},
                styles.measureCard,
                {
                  width: `${1 / measureSelectionOptions.length * 100}%`,
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
