/* @flow */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableWithoutFeedback,
  DeviceEventEmitter,
} from 'react-native';

import { selectable, SelectableContainer} from './Selectable';

const Butt = selectable(Button);

export default class App extends Component {
  render() {
    return (
      <View>
        <SelectableContainer>
          <Butt
            style={styles.button}
            title="Butt"
            onFocus={() => console.log('Butt focused')}
            onBlur={() => console.log('Butt blured')}
            onPress={() => console.log('Butt clicked')}
          />
          <Butt
            style={styles.button}
            title="Butt 2"
            onFocus={() => console.log('Butt 2 focused')}
            onBlur={() => console.log('Butt 2 blured')}
            onPress={() => console.log('Butt 2 clicked')}
          />
          <Butt
            style={styles.button}
            title="Butt 3"
            onFocus={() => console.log('Butt 3 focused')}
            onBlur={() => console.log('Butt 3 blured')}
            onPress={() => console.log('Butt 3 clicked')}
          />
          <Butt
            style={styles.button}
            title="Butt 4"
            onFocus={() => console.log('Butt 4 focused')}
            onBlur={() => console.log('Butt 4 blured')}
            onPress={() => console.log('Butt 4 clicked')}
          />
        </SelectableContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
  },
});
