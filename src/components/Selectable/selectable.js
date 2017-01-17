/* @flow */

import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';

type TProps = {
  onFocus: Function;
  onBlur: Function;
  onPress: Function;
  style: any;
}

type TState = {
  isFocused: boolean;
  registered: boolean;
}

type TContext = {
  registerSelectable: Function;
}

export default function selectable(WrappedComponent: any) {
  return class Selectable extends Component {
    static contextTypes = {
      registerSelectable: PropTypes.func,
    }

    state: TState = {
      isFocused: false,
      registered: false,
    }

    props: TProps
    context: TContext
    _wrappedComponent: any

    handleFocus = () => {
      const { onFocus = () => {} } = this.props;

      this.setState({ isFocused: true });

      onFocus();
    }

    handleBlur = () => {
      const { onBlur = () => {} } = this.props;

      this.setState({ isFocused: false });

      onBlur();
    }

    handleLayout = (e: any) => {
      const { layout } = e.nativeEvent;
      if (this.state.registered) {
        return;
      }

      const {
        onPress = () => {},
      } = this.props;

      this.context.registerSelectable(
        { x: layout.x, y: layout.y },
        this.handleFocus,
        this.handleBlur,
        onPress
      );

      this.setState({ registered: true });
    }

    render() {
      return (
        <View
          onLayout={this.handleLayout}
          style={[this.props.style, this.state.isFocused ? styles.active : {}]}
        >
          <WrappedComponent ref={x => (this._wrappedComponent = x)} {...this.props} />
        </View>
      );
    }
  };
}

const styles = StyleSheet.create({
  active: {
    opacity: 0.9,
  },
});
