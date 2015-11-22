'use strict';

import React, {
  StyleSheet,
  Image,
  View,
} from 'react-native';

import Road from '../containers/Road';
import Squirrel from '../components/Squirrel'

export default class GameScreen extends React.Component {
  constructor(props) {
    super(props);
  	this.state = {
  		score: 0,
  	};
	}

  render() {
    return (
      <View style={styles.container}>
        <Road style={styles.road}>
          <Squirrel style={styles.squirrel}/>
        </Road>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00C204',
    paddingLeft: 15,
    paddingRight: 15,
  },
  road: {
    flex: 1,
    justifyContent: 'center',
  },
});
