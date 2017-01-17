/* @flow */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import { SelectableContainer } from './Selectable';

type TProps = {
  url: string;
}

export default class Articles extends Component {
  props: TProps

  render() {
    return (
      <View>
        <SelectableContainer>
          <Text>Articles for {this.props.url}</Text>
        </SelectableContainer>
      </View>
    );
  }
}

