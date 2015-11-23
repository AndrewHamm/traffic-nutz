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
const JUMP_DURATION = 600;

export default class Squirrel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lane: 0,
      canSwipe: true,
      inAir: false
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
    // if it is already jumping, dont allow another jump
    if (this.state.jump) {
      return;
    }
    this.setState({
      inAir: true
    })
    // come down after a specified time
    window.setTimeout(() => this.setState({inAir: false}), JUMP_DURATION)
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

  // given an initial margin, adds the distance of the lane it is in
  _getMarginWithLane(initialMargin) {
    return initialMargin + LANE_WIDTH * this.state.lane;
  }

  _getSquirrelImage() {
    const marginLeft = this._getMarginWithLane(MARGIN_LEFT);
    if (!this.state.inAir) {
      return (
        <Image style={[styles.squirrel, {marginLeft: marginLeft}]} source={require('../images/groundSquirrel.png')}/>
      )
    } else {
      return (
        <Image style={[styles.squirrel, {marginLeft: marginLeft}]} source={require('../images/jumpSquirrel.png')}/>
      )
    }
  }

  render() {
    return (
      <View style={styles.container} {...this._panResponder.panHandlers}>
        {this._getSquirrelImage()}
      </View>
    );
  }
}

const LANE_WIDTH = 345 / 4;
const MARGIN_LEFT = 22;
const MARGIN_RIGHT = 8;
const WIDTH = LANE_WIDTH - (MARGIN_LEFT + MARGIN_RIGHT);
// the ration of height/width of the image
const RATIO = 1687 / 1045;

const styles = StyleSheet.create({
  container: {
    height: screen.height,
    justifyContent: 'center'
  },
  squirrel: {
    width: WIDTH,
    height: WIDTH * RATIO,
    marginLeft: MARGIN_LEFT,
    marginRight: MARGIN_RIGHT,
  },
});
