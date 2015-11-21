'use strict';

import React, {
  StyleSheet,
  Text,
  View,
} from 'react-native';

// TODO: Why do I need export default ?
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
        <View style={styles.road}>
          <Text>{this.state.score}</Text>
        </View>
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
    backgroundColor: '#828282',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
