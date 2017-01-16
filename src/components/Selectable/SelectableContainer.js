/* @flow */

import React, { Component, PropTypes } from 'react';
import { View, DeviceEventEmitter } from 'react-native';

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
  children: any;
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

  _listenerKeyDown: Function

  componentDidMount() {
    this._listenerKeyDown = DeviceEventEmitter.addListener('onKeyDown', this.handleKeyDown);
  }

  componentWillUnmount() {
    this._listenerKeyDown.remove();
  }

  getChildContext() {
    return {
      registerSelectable: this.registerSelectable,
    };
  }

  selectNewActive(idxModifier: Function) {
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

  handleKeyDown = (key: number) => {
    switch (key) {
      case 19:  // up arrow
        this.selectNewActive(x => x - 1);
        break;
      case 20: // down arrow
        this.selectNewActive(x => x + 1);
        break;
      case 23:  // center
        if (this.state.activeSelectable) {
          this.state.activeSelectable.onPress();
        }
        break;
    }

    return true;
  }

  registerSelectable = (
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
