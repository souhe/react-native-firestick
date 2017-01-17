/* @flow */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
} from 'react-native';

import { selectable, SelectableContainer, SelectableInput } from './Selectable';
import Router from '../Router';

type TProps = {
  navigator: Object;
}

type TState = {
  url: string;
  feeds: Array<Object>;
}

const SelectableButton = selectable(Button);

const FeedItem = selectable(({ url, name }) => (
  <View style={styles.feed}>
    <Text>{name}</Text>
    <Text>url: {url}</Text>
  </View>
));

export default class Feeds extends Component {
  props: TProps

  state: TState = {
    url: 'http://',
    feeds: [
      { url: 'http://javascriptweekly.com/rss/1b4h23bp', name: 'JS Weekly' },
      { url: 'https://blog.callstack.io/feed', name: 'Callstack.io blog' },
    ],
  }

  handleOpenClick = () => {
    console.log('URL', this.state.url);
    this.setState({ feeds: [...this.state.feeds, { url: this.state.url, name: this.state.url }] });
    // this.props.navigator.push(Router.getRoute('articles', { url: this.state.url }));
  }

  handleTextChange = (text: string) => {
    this.setState({ url: text });
  }

  render() {
    const { url, feeds } = this.state;
    const { navigator } = this.props;
    return (
      <View>
        <SelectableContainer>
          <View style={styles.feed}>
            <SelectableInput
              value={url}
              onChangeText={this.handleTextChange}
            />
            <SelectableButton
              style={styles.button}
              title="ADD"
              onPress={this.handleOpenClick}
            />
          </View>

          {feeds.map(feed => (
            <FeedItem
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
  feed: {
    margin: 10,
    padding: 10,
    borderLeftWidth: 4,
    borderLeftColor: 'gray',
  },
});
