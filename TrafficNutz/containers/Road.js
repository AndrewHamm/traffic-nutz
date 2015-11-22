'use strict';

import React, {
  StyleSheet,
  View,
  Text
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import DashedLine from '../components/DashedLine';

export default class Road extends React.Component {
  render() {
    return (
      <View style={this.props.style}>
        <LinearGradient colors={['#909090', '#454545']} style={styles.road}>
          <View style={[styles.lane, styles.farLeft]}/>
          <DashedLine style={styles.passingLine} color='white'/>
          <View style={[styles.lane, styles.midLeft]}/>
          <View style={[styles.lane, styles.midRight]}/>
          <DashedLine style={styles.passingLine} color='white'/>
          <View style={styles.lane}/>
        </LinearGradient>
        <View style={styles.overlayContainer}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  overlayContainer: {
    position: 'relative',
    backgroundColor: 'transparent'
  },
  road: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  lane: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  passingLine: {
    backgroundColor: 'transparent',
    width: 1
  },
  midLeft: {
    borderRightWidth: 1,
    borderColor: '#F7F000',
    marginRight: 4,
  },
  midRight: {
    borderLeftWidth: 1,
    borderColor: '#F7F000',
    marginLeft: 4,
  },
});
