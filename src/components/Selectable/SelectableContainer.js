/* @flow */

import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import keyListener from './keyListener';
import keyCodes from './keyCodes';

type TPosition = {
  x: number;
  y: number;
}

type TSelectable = {
  x: number;
  y: number;
  onFocus: Function;
  onPress: Function;
  onBlur: Function;
}

type TState = {
  activeSelectable: ?TSelectable;
  selectables: Array<TSelectable>;
}

type TProps = {
  children?: any;
}

export default class SelectableContainer extends Component {
  static childContextTypes = {
    registerSelectable: PropTypes.func,
  }

  state: TState = {
    activeSelectable: null,
    selectables: [],
  }

  props: TProps

  _listenerKeyDown: ?Function

  componentDidMount() {
    this._listenerKeyDown = keyListener.set(this._handleKeyDown);
  }

  componentWillUnmount() {
    keyListener.remove(this._listenerKeyDown);
  }

  componentWillReceiveProps() {
    this._listenerKeyDown = keyListener.set(this._handleKeyDown, this._listenerKeyDown);
  }

  getChildContext() {
    return {
      registerSelectable: this._registerSelectable,
    };
  }

  _selectNewActive(idxModifier: Function) {
    if (this.state.activeSelectable) { // blur active Selectable
      this.state.activeSelectable.onBlur();
    }

    const sortedSelectables = this.state.selectables.sort((a, b) => (a.y - b.y));
    if (this.state.activeSelectable) { // select next Selectable
      const idx = sortedSelectables.indexOf(this.state.activeSelectable);
      const newIdx = idxModifier(idx || 0);
      if (newIdx >= 0 && newIdx < sortedSelectables.length) {
        sortedSelectables[newIdx].onFocus();
        this.setState({ activeSelectable: sortedSelectables[newIdx] });
      } else {
        this.setState({ activeSelectable: null });
      }
    } else { // select first Selectable
      sortedSelectables[0].onFocus();
      this.setState({ activeSelectable: sortedSelectables[0] });
    }
  }

  _handleKeyDown = (key: number) => {
    switch (key) {
      case keyCodes.up:
        this._selectNewActive(x => x - 1);
        break;
      case keyCodes.down:
        this._selectNewActive(x => x + 1);
        break;
      case keyCodes.center:
        if (this.state.activeSelectable) {
          this.state.activeSelectable.onPress();
        }
        break;
    }

    return true;
  }

  _registerSelectable = (
    position: TPosition,
    onFocus: Function,
    onBlur: Function,
    onPress: Function
  ) => {
    this.state.selectables.push({
      x: position.x,
      y: position.y,
      onFocus,
      onBlur,
      onPress,
    });

    this.setState({ selectables: this.state.selectables });
  }

  render() {
    const { children } = this.props;
    return (
      <View>
        {children}
      </View>
    );
  }
}
