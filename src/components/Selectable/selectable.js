/* @flow */

import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';

type TProps = {
  onFocus?: Function;
  onBlur?: Function;
  onPress?: Function;
  style?: any;
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

    _handleFocus = () => {
      const { onFocus } = this.props;

      this.setState({ isFocused: true });

      if (onFocus) {
        onFocus();
      }
    }

    _handleBlur = () => {
      const { onBlur } = this.props;

      this.setState({ isFocused: false });

      if (onBlur) {
        onBlur();
      }
    }

    _handleLayout = (e: Object) => {
      const { layout } = e.nativeEvent;
      if (this.state.registered) {
        return;
      }

      const {
        onPress = () => {},
      } = this.props;

      this.context.registerSelectable(
        { x: layout.x, y: layout.y },
        this._handleFocus,
        this._handleBlur,
        onPress
      );

      this.setState({ registered: true });
    }

    render() {
      return (
        <View
          onLayout={this._handleLayout}
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
    opacity: 0.7,
  },
});
