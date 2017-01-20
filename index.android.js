/**
 * Sample firestick app written in react-native
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import App from './src/components/App';

export default class FirestickApp extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('tv', () => FirestickApp);
