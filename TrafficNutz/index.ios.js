'use strict';

import React, {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import GameScreen from './screens/GameScreen';

export default class TrafficNutz extends React.Component {
  render() {
    return (
      <GameScreen/>
    );
  }
};

const styles = StyleSheet.create({
});

AppRegistry.registerComponent('TrafficNutz', () => TrafficNutz);
