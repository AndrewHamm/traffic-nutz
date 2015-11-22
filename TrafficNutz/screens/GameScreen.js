'use strict';

import React, {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Road from '../containers/Road';

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
          <Text> bleh </Text>
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
  },
});
