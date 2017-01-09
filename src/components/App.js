/* @flow */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default class App extends Component {
  render() {
    return (
      <View>
        <Button title="Button 1" onPress={() => console.log('Button 1 clicked')} />
        <TouchableOpacity onPress={() => console.log('Touchable clicked')} >
          <View><Text>Touchable 1</Text></View>
        </TouchableOpacity>
        <Button title="Button 2" onPress={() => console.log('Button 2 clicked')} />
        <TextInput />
        <Button title="Button 3" onPress={() => console.log('Button 3 clicked')} />
      </View>
    );
  }
}