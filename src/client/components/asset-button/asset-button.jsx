import React, { PropTypes, Component } from 'react';
import styles from './styles'

// const isItPercentage = (tag, number) => {
//   if(
//     tag.indexOf('Volatility') === 0 ||
//     tag.indexOf('Change') === 0
//   ) {
//     console.log('VOL')
//     return `${number.toFixed(2)}%`
//   }
//   console.log('NO VOl')
//   return number
// }

export default class AssetButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: 'yellow',
    }
    setTimeout(() => this.setState({ backgroundColor: 'white' }), 300)
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.asset.index > nextProps.asset.index
      && nextProps.asset.animate
    ) this.setState({
      backgroundColor: 'green'
    }, () => setTimeout(() => this.setState({ backgroundColor: 'white' }), 300))
    if (
      this.props.asset.index < nextProps.asset.index
      && nextProps.asset.animate
    ) this.setState({
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
        {/* {Object.keys(asset).filter(key => key !== 'top').map(key =>
          <div>{key}: {asset[key]}</div>
        )} */}
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
