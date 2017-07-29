import React, { Component, PropTypes } from 'react';
import {
  Animated,
  SelectionBar,
} from '../../containers';

export default class Root extends Component {
  constructor() {
    super()
    this.state = {
      gotSorted: false,
      selectedAssets: [],
      selectedFilter: null,
    };
    this.toggleAssetSelection = this.toggleAssetSelection.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
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

  render() {
    const {
      sorted,
      assets,
      gotSorted,
      selectedAssets,
      selectedFilter,
    } = this.state;
    const filters = [ 'sector', 'region' ]
    return (
      <div id="root-container">
        {
          sorted ?
          <Animated data={sorted} /> :
          null
        }
        <SelectionBar
          data={assets}
          top={gotSorted && selectedAssets.length > 0}
          selectedAssets={selectedAssets}
          toggleAssetSelection={this.toggleAssetSelection}
          filters={filters}
          selectedFilter={selectedFilter}
          toggleFilter={this.toggleFilter}
        />
      </div>
    );
  }
}
