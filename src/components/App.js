/* @flow */

import React, { Component } from 'react';

import {
  NavigationProvider,
  StackNavigation,
} from '@exponent/ex-navigation';

import Router from '../Router';

class App extends Component<void, void, void> {
  navigator: any;

  render() {
    return (
      <NavigationProvider router={Router}>
        <StackNavigation initialRoute={Router.getRoute('feeds')} />
      </NavigationProvider>
    );
  }
}

export default App;
