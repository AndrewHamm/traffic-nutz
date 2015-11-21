'use strict';

import React, {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBarIOS,
} from 'react-native';

import GameScreen from './screens/GameScreen';

export default class TrafficNutz extends React.Component {
  render() {
    StatusBarIOS.setHidden(true);
    return (
      <GameScreen/>
    );
  }
};

const styles = StyleSheet.create({
});

AppRegistry.registerComponent('TrafficNutz', () => TrafficNutz);
