import React, { Component, PropTypes } from 'react';
import {
  Animated,
  SelectionBar,
} from '../../containers';
import styles from './styles';

export default class Root extends Component {
  constructor() {
    super()
    this.state = {
      gotSorted: false,
      selectedAssets: [],
      selectedFilter: null,
      selectedMeasure: null,
      filters: [],
      filterSelectionOptions: ['region','sector', 'PE'],
      measureSelectionOptions: [],
      hideSelectionBar: false,
      // measureSelectionOptions: ['a', 'b', 'c', 'd'],
    };
    this.toggleAssetSelection = this.toggleAssetSelection.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
    this.toggleMeasure = this.toggleMeasure.bind(this);
    this.toggleSelectionBar = () => this.setState({ hideSelectionBar: !this.state.hideSelectionBar })
  }

  componentDidMount() {
    const connection = new WebSocket('ws://localhost:3000/connect')
    connection.onmessage = (e) => {
      const data = JSON.parse(e.data);
      this.setState(data)
      if(!this.state.gotSorted) {
        if(Object.keys(data)[0] === 'sorted') this.setState({ gotSorted: true });
      }
    }
    this.setState({ webSocketConnection: connection })
  }

  toggleAssetSelection(id){
    const { selectedAssets } = this.state;
    const index = selectedAssets.indexOf(id);
    if (index === -1) {
      selectedAssets.push(id);
      this.setState({
        selectedAssets
      }, () => this.state.webSocketConnection.send(JSON.stringify({ selectionUpdate: id, add: true }) ));
    } else {
      this.setState({
        selectedAssets: selectedAssets.slice(0, index).concat(selectedAssets.slice(index + 1))
      }, () => this.state.webSocketConnection.send(JSON.stringify({ selectionUpdate: id, add: false }) ));
    }
  }

  toggleFilter(selectedFilter) {
    if (this.state.selectedFilter !== selectedFilter) {
      this.setState({
        selectedFilter
      }, () => this.state.webSocketConnection.send(JSON.stringify({ filterUpdate: selectedFilter }) ));
    } else {
      this.setState({
        selectedFilter: null
      }, () => this.state.webSocketConnection.send(JSON.stringify({ filterUpdate: null }) ));
    }
  }

  toggleMeasure(selectedMeasure){
    if (this.state.selectedMeasure !== selectedMeasure) {
      this.setState({
        selectedMeasure
      }, () => this.state.webSocketConnection.send(JSON.stringify({ measureUpdate: selectedMeasure }) ));
    } else {
      this.setState({
        selectedMeasure: null
      }, () => this.state.webSocketConnection.send(JSON.stringify({ measureUpdate: null }) ));
    }
  }

  render() {
    const {
      sorted,
      assets,
      gotSorted,
      selectedAssets,
      selectedFilter,
      filters,
      filterSelectionOptions,
      measureSelectionOptions,
      selectedMeasure,
      hideSelectionBar,
    } = this.state;
    console.log('****', filters);
    return (
      <div id="root-container" style={styles.container}>
        {
          sorted ?
          <Animated
            filters={filters}
            data={sorted} /> :
          null
        }
        <SelectionBar
          toggleSelectionBar={this.toggleSelectionBar}
          hidden={hideSelectionBar}
          // hidden={true}
          data={assets}
          top={gotSorted && selectedAssets.length > 0}
          selectedAssets={selectedAssets}
          toggleAssetSelection={this.toggleAssetSelection}
          filterSelectionOptions={filterSelectionOptions}
          selectedFilter={selectedFilter}
          toggleFilter={this.toggleFilter}
          measureSelectionOptions={measureSelectionOptions}
          selectedMeasure={selectedMeasure}
          toggleMeasure={this.toggleMeasure}
        />
        {hideSelectionBar ?
          <div style={{ position: 'fixed', top: '95%', left: '95%'}}
               onClick={this.toggleSelectionBar}
          >
            Make selection
          </div> :
          null
        }
      </div>
    );
  }
}
