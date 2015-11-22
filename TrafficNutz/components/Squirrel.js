'use strict';

import React, {
  StyleSheet,
  View,
  Image,
  PanResponder,
  Text
} from 'react-native';

const screen = require('Dimensions').get('window');

const VELOCITY_THRESH = 1.7;

export default class Squirrel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lane: 0,
      canSwipe: true,
      jump: false
    };
  }

  _handleSwipe(gestureState) {
    if(gestureState.vx > VELOCITY_THRESH) {
      // move right
      this.setState({
        lane: this.state.lane + 1
      })
    } else if (gestureState.vx < -VELOCITY_THRESH) {
      // move left
      this.setState({
        lane: this.state.lane - 1
      })
    } else if (gestureState.vy < VELOCITY_THRESH) {
      // jump
      this.setState({
        jump: !this.state.jump
      })
    }
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderMove: (evt, gestureState) => {
        if (!this.state.canSwipe) {
          return;
        }
        const xSpeed = Math.abs(gestureState.vx);
        const ySpeed = Math.abs(gestureState.vy);
        if (xSpeed > VELOCITY_THRESH || ySpeed > VELOCITY_THRESH) {
          this.setState({
            canSwipe: false
          })
          this._handleSwipe(gestureState);
        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        this.setState({
          canSwipe: true
        })
      },
    });
  }

  render() {
    return (
      <View style={styles.container} {...this._panResponder.panHandlers}>
        <Image style={styles.squirrel} source={require('../images/backSquirrel1.png')}/>
        <Text>{this.state.lane} {this.state.jump? 'true': 'false'}</Text>
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
