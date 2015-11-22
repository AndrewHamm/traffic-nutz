'use strict';

import React, {
  StyleSheet,
  Image
} from 'react-native';

export default class Squirrel extends React.Component {
  render() {
    return (
      <Image style={this.props.style} source={require('../images/backSquirrel2.png')}/>
    );
  }
}

const styles = StyleSheet.create({
});
