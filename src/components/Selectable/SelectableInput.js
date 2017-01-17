/* @flow */

import React, { Component } from 'react';
import { TextInput } from 'react-native';

import selectable from './selectable';

const Selectable = selectable(TextInput);

export default class SelectableInput extends Component {
  _input: any

  handleInputPress = () => {
    this._input.focus();
  }

  handleSubmit = () => {
    this._input.blur();
  }

  render() {
    return (
      <Selectable
        onPress={this.handleInputPress}
        onSubmitEditing={this.handleSubmit}
        ref={i => (this._input = i ? i._wrappedComponent : null)}
        {...this.props}
      />
    );
  }
}
