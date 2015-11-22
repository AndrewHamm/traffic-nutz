'use strict';

import React, {
  StyleSheet,
  View,
} from 'react-native';

export default class DashedLine extends React.Component {
  _getFilledLine() {
    return (
      <View style={[styles.filled, {backgroundColor: this.props.color}]}/>
    );
  }

  _getEmptyLine() {
    return (
      <View style={styles.empty}/>
    );
  }

  _getDashedSection() {
    return (
      <View style={styles.section}>
        {this._getFilledLine()}
        {this._getEmptyLine()}
      </View>
    );
  }

  render() {
    return (
      <View style={this.props.style}>
        {this._getEmptyLine()}
        {Array(31).fill().map(_ => this._getDashedSection())}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  section: {
    flex: 3
  },
  filled: {
    flex: 2,
  },
  empty: {
    flex: 1,
    backgroundColor: 'transparent'
  }
});
