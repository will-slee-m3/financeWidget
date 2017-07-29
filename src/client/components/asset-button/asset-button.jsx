import React, { PropTypes, Component } from 'react';
import styles from './styles'

export default class AssetButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: 'white',
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.asset.index > nextProps.asset.index) this.setState({
      backgroundColor: 'green'
    }, () => setTimeout(() => this.setState({ backgroundColor: 'white' }), 300))
    if(this.props.asset.index < nextProps.asset.index) this.setState({
      backgroundColor: 'red'
    }, () => setTimeout(() => this.setState({ backgroundColor: 'white' }), 300))
  }

  render() {
    const { props: { asset }, state: { backgroundColor } } = this;
    return (
      <div style={Object.assign(
        {},
        styles.component,
        { backgroundColor }
      )}>
        {Object.keys(asset).filter(key => key !== 'top').map(key =>
          <div>{key}: {asset[key]}</div>
        )}
      </div>
    );
  }
}
