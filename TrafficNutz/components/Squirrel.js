'use strict';

import React, {
  StyleSheet,
  View,
  Image,
  Text
} from 'react-native';

const screen = require('Dimensions').get('window');

export default class Squirrel extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.squirrel} source={require('../images/backSquirrel1.png')}/>
      </View>
    );
  }
}

const marginLeft = 27;
const marginRight = 11;
const laneWidth = 345 / 4;
const width = laneWidth - (marginLeft + marginRight);
const ratio = 541 / 278;

const styles = StyleSheet.create({
  squirrel: {
    width: width,
    height: width * ratio,
    marginLeft: marginLeft + laneWidth * 0,
    marginRight: marginRight,
  },
});
