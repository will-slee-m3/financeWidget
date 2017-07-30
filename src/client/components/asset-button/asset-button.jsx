import React, { PropTypes, Component } from 'react';
import styles from './styles'

export default class AssetButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: 'yellow',
      timeouts: [setTimeout(() => this.setState({ backgroundColor: 'white' }), 300)]
    }
  }

  componentWillReceiveProps(nextProps) {
    const { timeouts } = this.state;
    if (
      this.props.asset.index > nextProps.asset.index
      && nextProps.asset.animate
    ) this.setState({
      backgroundColor: 'green'
    }, () => timeouts.push(setTimeout(() => this.setState({ backgroundColor: 'white' }), 300)))
    if (
      this.props.asset.index < nextProps.asset.index
      && nextProps.asset.animate
    ) this.setState({
      backgroundColor: 'red'
    }, () => timeouts.push(setTimeout(() => this.setState({ backgroundColor: 'white' }), 300)))
  }

  componentWillUnmount(){
    this.state.timeouts.map(t => clearTimeout(t));
  }

  render() {
    const { props: { asset }, state: { backgroundColor } } = this;
    return (
      <div style={Object.assign(
        {},
        styles.component,
        { backgroundColor }
      )}>
        <div>{asset.name}</div>
        <div>{asset.price}</div>
        {
          asset.sortTag && (asset.sortTag.indexOf('Volatility') === 0 || asset.sortTag.indexOf('Change') === 0) ?
            <div>
              <div>{asset.sortTag}</div>
              <div>{asset.sortField.toFixed(2)}%</div>
            </div> :
          null
        }
        {
          asset.sortTag && (asset.sortTag.indexOf('Volatility') !== 0 && asset.sortTag.indexOf('Change') !== 0) ?
            <div>
              <div>{asset.sortTag}</div>
              <div>{asset.sortField.toFixed(4)}</div>
            </div> :
          null
        }
      </div>
    );
  }
}
