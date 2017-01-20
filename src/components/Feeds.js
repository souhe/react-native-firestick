/* @flow */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
} from 'react-native';

import { selectable, SelectableContainer, SelectableInput } from './Selectable';
import Feed from './Feed';
import Router from '../Router';

type TProps = {
  navigator: Object;
}

type TState = {
  url: string;
  feeds: Array<Object>;
}

const SelectableButton = selectable(Button);
const SelectableFeedItem = selectable(Feed);

export default class Feeds extends Component {
  props: TProps

  state: TState = {
    url: 'http://',
    feeds: [
      { url: 'http://dailyjs.com/rss', name: 'JS Daily' },
      { url: 'https://blog.callstack.io/feed', name: 'Callstack.io blog' },
      { url: 'http://feeds.bbci.co.uk/news/rss.xml', name: 'BBC - Top Stories' },
    ],
  }

  _handleOpenClick = () => {
    this.setState({ feeds: [...this.state.feeds, { url: this.state.url, name: this.state.url }] });
  }

  _handleTextChange = (text: string) => {
    this.setState({ url: text });
  }

  render() {
    const { url, feeds } = this.state;
    const { navigator } = this.props;

    return (
      <View>
        <SelectableContainer>
          <View style={styles.addContainer}>
            <SelectableInput
              value={url}
              onChangeText={this._handleTextChange}
            />
            <SelectableButton
              style={styles.button}
              title="ADD"
              onPress={this._handleOpenClick}
            />
          </View>

          {feeds.map(feed => (
            <SelectableFeedItem
              name={feed.name}
              url={feed.url}
              onPress={() => navigator.push(Router.getRoute('articles', { url: feed.url }))}
              key={feed.url}
            />
          ))}
        </SelectableContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
  },
  addContainer: {
    margin: 10,
    padding: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#004b8b',
  },
});
