'use strict';

import React, {
  StyleSheet,
  View,
  Image,
  PanResponder,
  LayoutAnimation,
  Text
} from 'react-native';

const screen = require('Dimensions').get('window');

const VELOCITY_THRESH = 1.7;
const MAX_LANE_LOC = 3;

export default class Squirrel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lane: 0,
      canSwipe: true,
      jump: false
    };
  }

  _setAnimationPreset() {
    let animationPreset = LayoutAnimation.Presets.easeInEaseOut;
    animationPreset.duration = 250;
    LayoutAnimation.configureNext(animationPreset);
  }

  _swipeRight() {
    this._setAnimationPreset();
    if (this.state.lane >= MAX_LANE_LOC) {
      return;
    }
    this.setState({
      lane: this.state.lane + 1
    })
  }

  _swipeLeft() {
    this._setAnimationPreset();
    if (this.state.lane <= 0) {
      return;
    }
    this.setState({
      lane: this.state.lane - 1
    })
  }

  _swipeUp() {
    this.setState({
      jump: !this.state.jump
    })
  }

  _handleSwipe(gestureState) {
    if(gestureState.vx > VELOCITY_THRESH) {
      this._swipeRight()
    } else if (gestureState.vx < -VELOCITY_THRESH) {
      this._swipeLeft()
    } else if (gestureState.vy < VELOCITY_THRESH) {
      this._swipeUp()
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
    const marginLeft = MARGIN_LEFT + LANE_WIDTH * this.state.lane;
    return (
      <View style={styles.container} {...this._panResponder.panHandlers}>
        <Image style={[styles.squirrel, {marginLeft: marginLeft}]} source={require('../images/backSquirrel1.png')}/>
        <Text>{this.state.lane} {this.state.jump? 'true': 'false'}</Text>
      </View>
    );
  }
}

const MARGIN_LEFT = 27;
const MARGIN_RIGHT = 11;
const LANE_WIDTH = 345 / 4;
const width = LANE_WIDTH - (MARGIN_LEFT + MARGIN_RIGHT);
const ratio = 541 / 278;

const styles = StyleSheet.create({
  container: {
    height: screen.height,
    justifyContent: 'center'
  },
  squirrel: {
    width: width,
    height: width * ratio,
    marginRight: MARGIN_RIGHT,
  },
});
